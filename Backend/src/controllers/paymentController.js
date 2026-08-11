const axios = require('axios');
const prisma = require('../lib/prisma');
const { createBookingLedger, createServiceRequestLedger } = require('./transactionController');

async function initiatePayment(req, res) {
    try {
        const { bookingId } = req.body;
        
        let booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { customer: true }
        });
        let isServiceRequest = false;

        if (!booking) {
            booking = await prisma.serviceRequest.findUnique({
                where: { id: bookingId },
                include: { customer: true }
            });
            if (booking) {
                isServiceRequest = true;
            }
        }

        if (!booking) {
            return res.status(404).json({ error: "Booking or service request not found" });
        }

        if (booking.customerId !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const amountInRs = isServiceRequest 
            ? (booking.finalAmount || booking.inspectionFee)
            : (booking.finalPrice || booking.quotedPrice);

        if (!amountInRs) {
            return res.status(400).json({ error: "Amount not set" });
        }

        // Khalti takes amount in paisa
        const amountInPaisa = Math.round(Number(amountInRs) * 100);

        const payload = {
            return_url: `${process.env.FRONTEND_URL}/payment/callback`,
            website_url: process.env.FRONTEND_URL,
            amount: amountInPaisa,
            purchase_order_id: bookingId,
            purchase_order_name: isServiceRequest ? `Service Request ${booking.requestNumber}` : `Booking ${booking.bookingNumber}`,
            customer_info: {
                name: booking.customer.name,
                email: booking.customer.email,
                phone: booking.customer.phone || '9800000000'
            }
        };

        const response = await axios.post(
            'https://a.khalti.com/api/v2/epayment/initiate/',
            payload,
            {
                headers: {
                    'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json({
            payment_url: response.data.payment_url,
            pidx: response.data.pidx
        });

    } catch (error) {
        console.error("Payment initiation failed", error.response?.data || error.message);
        res.status(500).json({ error: "Payment initiation failed" });
    }
}

async function verifyPayment(req, res) {
    try {
        const { pidx } = req.body;

        if (!pidx) {
            return res.status(400).json({ error: "pidx is required" });
        }

        const response = await axios.post(
            'https://a.khalti.com/api/v2/epayment/lookup/',
            { pidx },
            {
                headers: {
                    'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data.status === 'Completed') {
            const purchaseOrderId = response.data.purchase_order_id;
            const amountInRs = response.data.total_amount / 100;

            // Determine if this is a booking or service request
            const booking = await prisma.booking.findUnique({ where: { id: purchaseOrderId } });
            const serviceRequest = !booking
                ? await prisma.serviceRequest.findUnique({ where: { id: purchaseOrderId } })
                : null;

            if (booking) {
                await prisma.booking.update({
                    where: { id: purchaseOrderId },
                    data: {
                        paymentStatus: 'ESCROW_HELD',
                        paymentMethod: 'khalti',
                        paymentTxnId: response.data.transaction_id,
                        escrowAmount: amountInRs,
                    },
                });
                // Record ledger entries
                await createBookingLedger(purchaseOrderId, amountInRs);
            } else if (serviceRequest) {
                await prisma.serviceRequest.update({
                    where: { id: purchaseOrderId },
                    data: {
                        paymentStatus: 'ESCROW_HELD',
                        paymentMethod: 'khalti',
                        paymentTxnId: response.data.transaction_id,
                        escrowAmount: amountInRs,
                    },
                });
                await createServiceRequestLedger(purchaseOrderId, amountInRs);
            } else {
                return res.status(404).json({ error: 'Booking or service request not found' });
            }

            return res.json({ success: true, message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ error: "Payment not completed", status: response.data.status });
        }

    } catch (error) {
        console.error("Payment verification failed", error.response?.data || error.message);
        res.status(500).json({ error: "Payment verification failed" });
    }
}

async function releasePayment(req, res) {
    try {
        const { bookingId } = req.params;
        
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId }
        });

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        // Only admin or customer can release payment?
        // Usually customer confirms the job is done
        if (booking.customerId !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        if (booking.paymentStatus !== 'ESCROW_HELD') {
            return res.status(400).json({ error: "No funds in escrow to release" });
        }

        await prisma.booking.update({
            where: { id: bookingId },
            data: {
                paymentStatus: 'RELEASED',
                customerConfirmedAt: new Date(),
                status: 'COMPLETED',
                completedAt: new Date()
            }
        });

        const amount = booking.escrowAmount || booking.finalPrice || booking.quotedPrice || 0;
        const earnings = Number(amount) * 0.90;

        await prisma.providerProfile.update({
            where: { id: booking.providerId },
            data: {
                walletBalance: { increment: earnings },
                totalEarnings: { increment: earnings }
            }
        });
        
        // Notify Provider
        await prisma.notification.create({
            data: {
                userId: booking.providerId,
                type: 'PAYMENT_RECEIVED',
                title: 'Payment Released',
                message: `Customer has confirmed booking ${booking.bookingNumber} and released funds.`,
                link: `/provider/bookings/${booking.id}`
            }
        });

        res.json({ success: true, message: "Payment released to provider successfully" });
    } catch (error) {
        console.error("Release payment failed", error);
        res.status(500).json({ error: "Release payment failed" });
    }
}

module.exports = {
    initiatePayment,
    verifyPayment,
    releasePayment
};
