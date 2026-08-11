const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

const SALT_ROUNDS = 10;

const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

function signToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
}

async function signup(req, res) {
    try {
        let { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: "Name, email and password are required.",
            });
        }

        role = role ? role.toUpperCase() : "CUSTOMER";

        if (!["CUSTOMER", "PROVIDER"].includes(role)) {
            return res.status(400).json({
                error: "Invalid role.",
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(409).json({
                error: "User already exists.",
            });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                role,
            },
        });

        const token = signToken(user);

        res.cookie("token", token, COOKIE_OPTIONS);

        return res.status(201).json({
            message: "Signup successful.",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Signup Error:", error);

        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required.",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password.",
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!validPassword) {
            return res.status(401).json({
                error: "Invalid email or password.",
            });
        }

        if (user.status !== "ACTIVE") {
            return res.status(403).json({
                error: "Your account has been suspended.",
            });
        }

        const token = signToken(user);

        res.cookie("token", token, COOKIE_OPTIONS);

        return res.json({
            message: "Login successful.",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}

async function me(req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                phone: true,
                avatarUrl: true,
                status: true,
                createdAt: true,
                providerProfile: {
                    select: {
                        id: true,
                        categoryId: true,
                        totalEarnings: true,
                        averageRating: true,
                        reviewCount: true,
                        category: {
                            select: { name: true, slug: true }
                        }
                    }
                }
            },
        });

        if (!user) {
            return res.status(404).json({
                error: "User not found.",
            });
        }

        return res.json({
            user,
        });
    } catch (error) {
        console.error("Me Error:", error);

        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}

function logout(req, res) {
    res.clearCookie("token");

    return res.json({
        message: "Logged out successfully.",
    });
}

async function updateProfile(req, res) {
    try {
        const { name, phone, avatarUrl } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "Name is required." });
        }

        const data = {
            name: name.trim(),
            phone: phone?.trim() || null,
        };

        // Only update avatarUrl if explicitly provided
        if (typeof avatarUrl === 'string') {
            data.avatarUrl = avatarUrl || null;
        }

        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                phone: true,
                avatarUrl: true,
                status: true,
                createdAt: true,
            },
        });

        return res.json({ user: updatedUser });
    } catch (error) {
        console.error("Update Profile Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    signup,
    login,
    me,
    logout,
    updateProfile,
};