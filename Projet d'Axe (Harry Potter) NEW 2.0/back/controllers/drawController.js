import { prisma } from "../config/prisma.js";

async function lastDraw(req, res, next) {
    try {
        const userId = parseInt(req.params.userId);
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        if (user.lastdraw && new Date(user.lastdraw) > new Date(Date.now() - 86400000)) {
            return res.status(403).send("Tirage déjà effectué aujourd'hui");
        }
        next();
    } catch (error) {
        console.log('Erreur pendant le tirage:', error);
        res.status(500).send("Erreur serveur");
    }
}

async function drawCards(req, res) {
    const userId = parseInt(req.params.userId);

    try {
        const cards = await prisma.card.findMany();
        const draw = [];
        for (let i = 0; i < 5; i++) {
            draw.push(Math.floor(Math.random() * cards.length));
        }

        for (const cardIndex of draw) {
            await prisma.inventaire.create({
                data: {
                    ownerId: userId,
                    cardId: cards[cardIndex].id,
                }
            });
        }

        const userInventaire = await prisma.inventaire.findMany({
            where: { ownerId: userId },
            include: { card: true },
            orderBy: { cardId: 'asc' }
        });

        res.json({ draw, userInventaire });
    } catch (error) {
        console.log('Erreur lors du tirage:', error);
        res.status(500).send("Erreur serveur");
    }
}

export {
    drawCards,
    lastDraw
};