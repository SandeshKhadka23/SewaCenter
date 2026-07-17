const prisma = require('../lib/prisma');

async function apply(req, res) {
    try {
        const userId = req.user.id;
        const { phone, location, category, skills, experience, bio, profileImageUrl } = req.body;

        if (!phone || !category || !skills || !experience) {
            return res.status(400).json({ error: 'Phone, category, skills, and experience are required' });
        }

        const existing = await prisma.providerProfile.findUnique({ where: { userId } });
        if (existing) {
            return res.status(409).json({ error: 'You have already submitted a provider application' });
        }

        const profile = await prisma.providerProfile.create({
            data: { userId, phone, location, category, skills, experience, bio, profileImageUrl },
        });

        return res.status(201).json({ profile });
    } catch (err) {
        console.error('Provider apply error:', err);
        return res.status(500).json({ error: 'Something went wrong submitting your application' });
    }
}

module.exports = { apply };