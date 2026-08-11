const prisma = require("../lib/prisma");

// Generate booking number
function generateBookingNumber() {
    return (
        "BK" +
        Date.now().toString().slice(-6) +
        Math.floor(Math.random() * 1000)
    );
}

// ----------------------------
// Create Booking
// ----------------------------
async function createBooking(req, res) {
    try {
        const customerId = req.user.id;

        const {
            providerId,
            serviceId,
            catalogServiceId,
            serviceName,
            scheduledDate,
            timeSlot,
            address,
            landmark,
            notes,
            contactName,
            contactPhone,
            paymentMethod,
        } = req.body;

        if (
            !providerId ||
            !serviceName ||
            !scheduledDate ||
            !timeSlot ||
            !address ||
            !contactName ||
            !contactPhone
        ) {
            return res.status(400).json({
                error: "Please fill all required fields.",
            });
        }

        const provider = await prisma.providerProfile.findUnique({
            where: {
                id: providerId,
            },
        });

        if (!provider) {
            return res.status(404).json({
                error: "Provider not found.",
            });
        }

        let priceToQuote = provider.price;
        if (catalogServiceId) {
            const catalogService = await prisma.catalogService.findUnique({
                where: { id: catalogServiceId },
            });
            if (catalogService && catalogService.basePrice) {
                priceToQuote = catalogService.basePrice;
            }
        }

        const booking = await prisma.booking.create({
            data: {
                bookingNumber: generateBookingNumber(),
                customerId,
                providerId,
                serviceId,
                catalogServiceId,
                serviceName,
                scheduledDate: new Date(scheduledDate),
                timeSlot,
                address,
                landmark,
                notes,
                contactName,
                contactPhone,
                quotedPrice: priceToQuote,
                paymentMethod,
            },
        });

        return res.status(201).json({
            message: "Booking created successfully.",
            booking,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}

// ----------------------------
// Customer Bookings
// ----------------------------
async function getCustomerBookings(req, res) {

    try {

        const bookings = await prisma.booking.findMany({
            where: {
                customerId: req.user.id,
            },
            include: {
                provider: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.json(bookings);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Internal Server Error",
        });

    }

}

// ----------------------------
// Provider Bookings
// ----------------------------
async function getProviderBookings(req, res) {

    try {

        const provider = await prisma.providerProfile.findUnique({
            where: {
                userId: req.user.id,
            },
        });

        if (!provider) {
            return res.status(404).json({
                error: "Provider not found.",
            });
        }

        const bookings = await prisma.booking.findMany({
            where: {
                providerId: provider.id,
            },
            include: {
                customer: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.json(bookings);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Internal Server Error",
        });

    }

}

// ----------------------------
// Get Booking Details
// ----------------------------
async function getBookingById(req, res) {

    try {

        const booking = await prisma.booking.findUnique({
            where: {
                id: req.params.id,
            },
            include: {
                customer: true,
                provider: {
                    include: {
                        user: true,
                    },
                },
                service: true,
            },
        });

        if (!booking) {

            return res.status(404).json({
                error: "Booking not found.",
            });

        }

        res.json(booking);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Internal Server Error",
        });

    }

}

// ----------------------------
// Update Booking Status
// ----------------------------
async function updateBookingStatus(req, res) {

    try {
        const { status } = req.body;

        const existing = await prisma.booking.findUnique({
            where: { id: req.params.id },
        });

        if (!existing) {
            return res.status(404).json({ error: "Booking not found." });
        }

        let paymentUpdate = {};
        if (req.body.paymentStatus) {
            paymentUpdate = { paymentStatus: req.body.paymentStatus };
        } else if (status === "COMPLETED" && existing.status !== "COMPLETED") {
            const amount = existing.finalPrice || existing.quotedPrice || 0;
            const commission = Number(amount) * 0.10;
            const earnings = Number(amount) * 0.90;

            if (existing.paymentMethod === 'CASH') {
                await prisma.providerProfile.update({
                    where: { id: existing.providerId },
                    data: {
                        walletBalance: { decrement: commission },
                        totalEarnings: { increment: earnings }
                    }
                });
                // Default to PAID if not specified
                paymentUpdate = { paymentStatus: 'PAID' };
            }
        }

        const booking = await prisma.booking.update({
            where: {
                id: req.params.id,
            },
            data: {
                status,
                ...paymentUpdate,
                ...(status === "CONFIRMED" && {
                    confirmedAt: new Date(),
                }),

                ...(status === "COMPLETED" && {
                    completedAt: new Date(),
                }),

                ...(status === "CANCELLED" && {
                    cancelledAt: new Date(),
                }),

            },

        });

        res.json({
            message: "Booking updated successfully.",
            booking,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Internal Server Error",
        });

    }

}

// ----------------------------
// Cancel Booking
// ----------------------------
async function cancelBooking(req, res) {

    try {
        const { reason } = req.body;

        const booking = await prisma.booking.update({

            where: {
                id: req.params.id,
            },

            data: {
                status: "CANCELLED",
                cancelledAt: new Date(),
                cancellationReason: reason,
            },

        });

        res.json({
            message: "Booking cancelled.",
            booking,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Internal Server Error",
        });

    }

}


// ----------------------------
// Customer Confirm Completion
// ----------------------------
async function customerConfirmCompletion(req, res) {
    try {
        const { id } = req.params;
        const { confirmed } = req.body;
        
        const booking = await prisma.booking.update({
            where: { id },
            data: {
                customerConfirmedAt: confirmed ? new Date() : null,
            },
        });
        
        res.json(booking);
    } catch (error) {
        console.error("customerConfirmCompletion error:", error);
        res.status(500).json({ error: "Failed to update completion status." });
    }
}

// ----------------------------
// Update Payment Status (Provider)
// ----------------------------
async function updatePaymentStatus(req, res) {
    try {
        const { id } = req.params;
        const { paymentStatus } = req.body;
        
        const booking = await prisma.booking.update({
            where: { id },
            data: { paymentStatus },
        });
        
        res.json(booking);
    } catch (error) {
        console.error("updatePaymentStatus error:", error);
        res.status(500).json({ error: "Failed to update payment status." });
    }
}

module.exports = {
    createBooking,
    getCustomerBookings,
    getProviderBookings,
    getBookingById,
    updateBookingStatus,
    cancelBooking,
    customerConfirmCompletion,
    updatePaymentStatus
};