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
        const cards = await prisma.card.findMany(); // On récupère tout les cartes dans l'API Lainocs
        const draw = []; // SA TIRE 5 CARTE ALEATOIRE
        for (let i = 0; i < 5; i++) {
            draw.push(Math.floor(Math.random() * cards.length));
        }

        for (const cardIndex of draw) { // PERMET D'ENREGISTRER DANS L'INVENTAIRE (BDD) LES CARTES TIRER
            await prisma.inventaire.create({
                data: {
                    ownerId: userId,
                    cardId: cards[cardIndex].id,
                }
            });
        }

        const userInventaire = await prisma.inventaire.findMany({ // Récupère et retourne l'inventaire mis à jour de l'utilisateur
            where: { ownerId: userId },
            include: { card: true },
            orderBy: { cardId: 'asc' }
        });

        res.json({ draw, userInventaire }); // Renvoie le tirage et l'inventaire de l'utilisateur au client
    } catch (error) {
        console.log('Erreur lors du tirage:', error);
        res.status(500).send("Erreur serveur");
    }
}

export {
    drawCards,
    lastDraw
};
