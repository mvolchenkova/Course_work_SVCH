const { Muscle } = require('../models/models');

class MuscleController {
    async getAll(req, res) {
        try {
            // Получаем все мышцы, сортируя их по группе и названию
            const muscles = await Muscle.findAll({
                order: [
                    ['muscleGroup', 'ASC'],
                    ['muscleName', 'ASC']
                ]
            });
            return res.json(muscles);
        } catch (error) {
            console.error('Ошибка при получении мышц:', error);
            return res.status(500).json({ message: "Не удалось загрузить список мышц" });
        }
    }
}

module.exports = new MuscleController();