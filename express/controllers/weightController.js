const { Weight } = require('../models/models');

const weightController = {

    async getWeights(req, res) {
        try {
            const userId = Number(req.params.userId);

            const weights = await Weight.findAll({
                where: { idUser: userId },
                order: [['date', 'ASC']],
                raw: true
            });

            res.json(weights);
        } catch (err) {
            console.error("🔥 ERROR:", err);
            res.status(500).json({ message: err.message });
        }
    },

    async addWeight(req, res) {
        try {
            const userId = Number(req.params.userId);
            const { weight, date } = req.body;

            const newWeight = await Weight.create({
                idUser: userId,
                weight: Number(weight),
                date: date ? new Date(date) : new Date()
            });

            res.json(newWeight);
        } catch (err) {
            console.error("🔥 ERROR:", err);
            res.status(500).json({ message: err.message });
        }
    },

    async deleteWeight(req, res) {
        try {
            const { weightId } = req.params;

            await Weight.destroy({
                where: { id: weightId }
            });

            res.json({ message: 'Weight entry deleted' });
        } catch (err) {
            console.error("🔥 ERROR:", err);
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = weightController;