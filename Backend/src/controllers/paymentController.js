const axios = require('axios');
const prisma = require('../lib/prisma');
const {
    createBookingLedger,
    createServiceRequestLedger
} = require('./transactionController');


// ============================================================
// INITIATE KHALTI PAYMENT
// ============================================================

async function initiatePayment(req, res) {
    try {
        const { bookingId } = req.body;

        let booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { customer: true }
        });

        let isServiceRequest = false;

        // If not a normal booking, check service request
        if (!booking) {
            booking = await prisma.serviceRequest.findUnique({
                where: { id: bookingId },
                include: { customer: true }
            });

            if (booking) {
                isServiceRequest = true;
            }
        }

        // Nothing found
        if (!booking) {
            return res.status(404).json({
                error: "Booking or service request not found"
            });
        }

        // Make sure the logged-in customer owns this booking
        if (booking.customerId !== req.user.id) {
            return res.status(403).json({
                error: "Unauthorized"
            });
        }

        // Determine payment amount
        const amountInRs = isServiceRequest
            ? (booking.finalAmount || booking.inspectionFee)
            : (booking.finalPrice || booking.quotedPrice);

        if (!amountInRs) {
            return res.status(400).json({
                error: "Amount not set"
            });
        }

        // Khalti requires amount in paisa
        const amountInPaisa = Math.round(
            Number(amountInRs) * 100
        );

        // Khalti payment payload
        const payload = {
            return_url: `${process.env.FRONTEND_URL}/payment/callback`,

            website_url: process.env.FRONTEND_URL,

            amount: amountInPaisa,

            purchase_order_id: bookingId,

            purchase_order_name: isServiceRequest
                ? `Service Request ${booking.requestNumber}`
                : `Booking ${booking.bookingNumber}`,

            customer_info: {
                name: booking.customer.name,
                email: booking.customer.email,
                phone: booking.customer.phone || '9800000000'
            }
        };

        // Sandbox Khalti API
        const response = await axios.post(
            'https://dev.khalti.com/api/v2/epayment/initiate/',
            payload,
            {
                headers: {
                    'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("Khalti initiation successful:", response.data);

        return res.json({
            payment_url: response.data.payment_url,
            pidx: response.data.pidx
        });

    } catch (error) {
        console.error(
            "Payment initiation failed:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            error: "Payment initiation failed"
        });
    }
}


// ============================================================
// VERIFY KHALTI PAYMENT
// ============================================================

async function verifyPayment(req, res) {
    try {
        const {
            pidx,
            purchaseOrderId
        } = req.body;

        // --------------------------------------------------------
        // Validate request
        // --------------------------------------------------------

        if (!pidx) {
            return res.status(400).json({
                error: "pidx is required"
            });
        }

        if (!purchaseOrderId) {
            return res.status(400).json({
                error: "purchaseOrderId is required"
            });
        }

        // --------------------------------------------------------
        // Ask Khalti for the FINAL payment status
        // --------------------------------------------------------

        const response = await axios.post(
            'https://dev.khalti.com/api/v2/epayment/lookup/',
            {
                pidx
            },
            {
                headers: {
                    'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log(
            "Khalti lookup response:",
            response.data
        );

        // --------------------------------------------------------
        // Only Completed payments are accepted
        // --------------------------------------------------------

        if (response.data.status !== 'Completed') {
            return res.status(400).json({
                error: "Payment not completed",
                status: response.data.status
            });
        }

        // Khalti returns amount in paisa
        const amountInRs =
            response.data.total_amount / 100;

        const transactionId =
            response.data.transaction_id;

        // --------------------------------------------------------
        // IMPORTANT:
        // purchaseOrderId comes from our frontend callback.
        //
        // Do NOT use:
        // response.data.purchase_order_id
        //
        // because it can be undefined in the lookup response.
        // --------------------------------------------------------

        // --------------------------------------------------------
        // First check normal booking
        // --------------------------------------------------------

        const booking = await prisma.booking.findUnique({
            where: {
                id: purchaseOrderId
            }
        });

        // --------------------------------------------------------
        // If not booking, check service request
        // --------------------------------------------------------

        const serviceRequest = !booking
            ? await prisma.serviceRequest.findUnique({
                where: {
                    id: purchaseOrderId
                }
            })
            : null;

        // --------------------------------------------------------
        // Neither exists
        // --------------------------------------------------------

        if (!booking && !serviceRequest) {
            return res.status(404).json({
                error: "Booking or service request not found"
            });
        }

        // --------------------------------------------------------
        // Prevent duplicate verification
        // --------------------------------------------------------

        if (
            booking &&
            booking.paymentStatus === 'ESCROW_HELD'
        ) {
            return res.json({
                success: true,
                message: "Payment was already verified"
            });
        }

        if (
            serviceRequest &&
            serviceRequest.paymentStatus === 'ESCROW_HELD'
        ) {
            return res.json({
                success: true,
                message: "Payment was already verified"
            });
        }

        // ========================================================
        // NORMAL BOOKING
        // ========================================================

        if (booking) {

            await prisma.booking.update({
                where: {
                    id: purchaseOrderId
                },

                data: {
                    paymentStatus: 'ESCROW_HELD',

                    paymentMethod: 'khalti',

                    paymentTxnId: transactionId,

                    escrowAmount: amountInRs
                }
            });

            // Create transaction ledger
            await createBookingLedger(
                purchaseOrderId,
                amountInRs
            );

        }

        // ========================================================
        // INSPECTION-BASED SERVICE REQUEST
        // ========================================================

        else if (serviceRequest) {

            await prisma.serviceRequest.update({
                where: {
                    id: purchaseOrderId
                },

                data: {
                    paymentStatus: 'ESCROW_HELD',

                    paymentMethod: 'khalti',

                    paymentTxnId: transactionId,

                    escrowAmount: amountInRs
                }
            });

            // Create transaction ledger
            await createServiceRequestLedger(
                purchaseOrderId,
                amountInRs
            );
        }

        // --------------------------------------------------------
        // Success
        // --------------------------------------------------------

        return res.json({
            success: true,

            message: "Payment verified successfully",

            amount: amountInRs,

            transactionId
        });

    } catch (error) {

        console.error(
            "Payment verification failed:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            error: "Payment verification failed"
        });
    }
}


// ============================================================
// RELEASE ESCROW PAYMENT
// ============================================================

async function releasePayment(req, res) {
    try {
        const { bookingId } = req.params;

        // --------------------------------------------------------
        // Find booking
        // --------------------------------------------------------

        const booking = await prisma.booking.findUnique({
            where: {
                id: bookingId
            }
        });

        if (!booking) {
            return res.status(404).json({
                error: "Booking not found"
            });
        }

        // --------------------------------------------------------
        // Only the customer who created the booking
        // can confirm completion
        // --------------------------------------------------------

        if (booking.customerId !== req.user.id) {
            return res.status(403).json({
                error: "Unauthorized"
            });
        }

        // --------------------------------------------------------
        // Payment must be held in escrow
        // --------------------------------------------------------

        if (booking.paymentStatus !== 'ESCROW_HELD') {
            return res.status(400).json({
                error: "No funds in escrow to release"
            });
        }

        // --------------------------------------------------------
        // Calculate provider earning
        // --------------------------------------------------------

        const amount =
            booking.escrowAmount ||
            booking.finalPrice ||
            booking.quotedPrice ||
            0;

        const earnings =
            Number(amount) * 0.90;

        // --------------------------------------------------------
        // Update booking
        // --------------------------------------------------------

        await prisma.booking.update({
            where: {
                id: bookingId
            },

            data: {
                paymentStatus: 'RELEASED',

                customerConfirmedAt: new Date(),

                status: 'COMPLETED',

                completedAt: new Date()
            }
        });

        // --------------------------------------------------------
        // Add 90% to provider wallet
        // --------------------------------------------------------

        await prisma.providerProfile.update({
            where: {
                id: booking.providerId
            },

            data: {
                walletBalance: {
                    increment: earnings
                },

                totalEarnings: {
                    increment: earnings
                }
            }
        });

        // --------------------------------------------------------
        // Get provider's User ID
        // --------------------------------------------------------

        const providerProfile =
            await prisma.providerProfile.findUnique({
                where: {
                    id: booking.providerId
                },

                select: {
                    userId: true
                }
            });

        // --------------------------------------------------------
        // Notify provider
        // --------------------------------------------------------

        if (providerProfile) {

            await prisma.notification.create({
                data: {
                    userId: providerProfile.userId,

                    type: 'PAYMENT_RECEIVED',

                    title: 'Payment Released',

                    message:
                        `Customer has confirmed booking ${booking.bookingNumber} and released funds.`,

                    link:
                        `/provider/bookings/${booking.id}`
                }
            });
        }

        return res.json({
            success: true,

            message:
                "Payment released to provider successfully",

            amount: Number(amount),

            providerEarnings: earnings,

            platformFee: Number(amount) * 0.10
        });

    } catch (error) {

        console.error(
            "Release payment failed:",
            error
        );

        return res.status(500).json({
            error: "Release payment failed"
        });
    }
}


// ============================================================
// EXPORTS
// ============================================================

module.exports = {
    initiatePayment,
    verifyPayment,
    releasePayment
};