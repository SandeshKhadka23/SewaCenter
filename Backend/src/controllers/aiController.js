const Groq = require("groq-sdk");
const prisma = require("../lib/prisma");

let groq = null;

async function processAiRequest(req, res) {
    try {
        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({ error: "Sewa AI is currently unavailable (Missing API Key)." });
        }
        
        if (!groq) {
            groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        }

        const { messages } = req.body;
        
        const systemPrompt = `You are a helpful AI assistant for a home services booking platform called "Sewa Center".
Your goal is to understand the customer's problem and either:
1. Ask follow-up questions to gather more details (max 2 questions total).
2. If enough info is gathered (e.g. they described what needs fixing, urgency, category), return a JSON object with the extracted details and recommend providers.

You must ALWAYS output valid JSON.
Format of JSON:
{
  "sufficient": boolean, 
  "question": "Ask a clarifying question if sufficient is false",
  "extracted": {
    "categorySlug": "plumbing|electrical|carpentry|painting|cleaning (only if sufficient, guess best fit)",
    "urgency": "High|Medium|Low (only if sufficient)",
    "serviceDetails": "Summarized details of the task (only if sufficient)"
  }
}
If the customer provides enough info (like "my pipe is leaking very badly"), sufficient is true.
If the customer just says "I need help", sufficient is false and ask what kind of help.
`;

        const response = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                ...messages
            ],
            model: "llama-3.1-8b-instant",
            response_format: { type: "json_object" },
            temperature: 0.2
        });

        const aiResponseText = response.choices[0]?.message?.content;
        let aiData;
        try {
            aiData = JSON.parse(aiResponseText);
        } catch (e) {
            return res.status(500).json({ error: "Failed to parse AI response" });
        }

        if (!aiData.sufficient) {
            return res.json({ sufficient: false, message: aiData.question });
        }

        const { categorySlug, urgency, serviceDetails } = aiData.extracted;

        const category = await prisma.category.findFirst({
            where: { slug: categorySlug.toLowerCase() }
        });

        let providers = [];
        if (category) {
            const availableProviders = await prisma.providerProfile.findMany({
                where: {
                    categoryId: category.id,
                    user: { status: "ACTIVE" }
                },
                include: {
                    user: { select: { id: true, name: true, avatarUrl: true } },
                    category: { select: { name: true, slug: true } }
                }
            });

            providers = availableProviders.map(p => {
                const score = (p.averageRating * 10) + Math.min(p.reviewCount, 50) + 20; 
                return { ...p, score };
            }).sort((a, b) => b.score - a.score).slice(0, 3);
        }

        res.json({
            sufficient: true,
            extracted: aiData.extracted,
            providers,
            category: category ? category.name : categorySlug
        });

    } catch (error) {
        console.error("AI processing error message:", error.message);
        console.error("AI processing error stack:", error.stack);
        res.status(500).json({ error: error.message || "Failed to process AI request" });
    }
}

module.exports = { processAiRequest };
