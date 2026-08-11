require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const providerRoutes = require("./routes/providerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const catalogServiceRoutes = require("./routes/catalogServiceRoutes");
const serviceRequestRoutes = require("./routes/serviceRequestRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const providerServicesRoutes = require("./routes/providerServicesRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

/* =======================
        CORS
======================= */

// Allowed frontend origins
const allowedOrigins = [
    "https://sewa-center.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests without an origin
            // such as Postman, curl, or server-to-server requests
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },

        credentials: true,

        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS",
        ],

        allowedHeaders: [
            "Content-Type",
            "Authorization",
        ],
    })
);

/* =======================
      Middleware
======================= */

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cookieParser());

/* =======================
        API Routes
======================= */

app.use("/api/auth", authRoutes);

app.use("/api/providers", providerRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/quotes", quoteRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/catalog-services", catalogServiceRoutes);

app.use("/api/service-requests", serviceRequestRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/provider-services", providerServicesRoutes);

app.use("/api/ai", aiRoutes);

/* =======================
       Health Check
======================= */

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running successfully.",
    });
});

/* =======================
        404 Handler
======================= */

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
    });
});

/* =======================
     Global Error Handler
======================= */

app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

/* =======================
        Start Server
======================= */

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${ PORT } `);
});