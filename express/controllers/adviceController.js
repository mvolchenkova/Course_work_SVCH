const { Advice } = require('../models/models');
const path = require('path');

class QuestionController {
    async create(req, res) {
        try {
            const { title, text } = req.body;
            const advice = await Advice.create({ title, text });
            return res.status(201).json(advice);
        } catch (error) {
            console.error('Ошибка при создании совета:', error);
            return res.status(500).json({ message: 'Ошибка при создании совета' });
        }
    }

    async getAll(req, res) {
        try {
            const advices = await Advice.findAll(); 
            return res.json(advices);
        } catch (error) {
            console.error('Ошибка при получении советов:', error);
            return res.status(500).json({ message: 'Ошибка при получении советов' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params; 
            const deletedAdvice = await Advice.destroy({
                where: { adviceId: id }
            });

            if (!deletedAdvice) {
                return res.status(404).json({ message: 'Совет не найден' });
            }

            return res.status(204).send();
        } catch (error) {
            console.error('Ошибка при удалении совета:', error);
            return res.status(500).json({ message: 'Ошибка при удалении совета' });
        }
    }
}

module.exports = new QuestionController();