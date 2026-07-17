const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

const SALT_ROUNDS = 10;
const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

function signToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

async function signup(req, res) {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }
        if (role && !['customer', 'provider'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(409).json({ error: 'An account with that email already exists' });
        }
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await prisma.user.create({
            data: { name, email, passwordHash, role: role || 'customer' },
        });
        const token = signToken(user);
        res.cookie('token', token, COOKIE_OPTIONS);
        return res.status(201).json({
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        console.error('Signup error:', err);
        return res.status(500).json({ error: 'Something went wrong during signup' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatches) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = signToken(user);
        res.cookie('token', token, COOKIE_OPTIONS);
        return res.json({
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Something went wrong during login' });
    }
}

async function me(req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, name: true, email: true, role: true, createdAt: true },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json({ user });
    } catch (err) {
        console.error('Me error:', err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

function logout(req, res) {
    res.clearCookie('token', COOKIE_OPTIONS);
    return res.json({ success: true });
}

module.exports = { signup, login, me, logout };