const { Question } = require('../models/models');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class QuestionController {
    async create(req, res) {
        try {
            const { userId, text, email } = req.body;
            const question = await Question.create({ userId, text, email });
            return res.status(201).json(question);
        } catch (error) {
            console.error('Ошибка при создании вопроса:', error);
            return res.status(500).json({ message: 'Ошибка при создании вопроса' });
        }
    }

    async getAll(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;
            const { count, rows } = await Question.findAndCountAll({
                limit,
                offset,
            });
            return res.json({ total: count, page, questions: rows });
        } catch (error) {
            console.error('Ошибка при получении вопросов:', error);
            return res.status(500).json({ message: 'Ошибка при получении вопросов' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params; // Получаем id из параметров
            const deletedQuestion = await Question.destroy({
                where: { questionId: id }
            });

            if (!deletedQuestion) {
                return res.status(404).json({ message: 'Вопрос не найден' });
            }

            return res.status(204).send(); // Успешное удаление, без содержимого
        } catch (error) {
            console.error('Ошибка при удалении вопроса:', error);
            return res.status(500).json({ message: 'Ошибка при удалении вопроса' });
        }
    }
}

module.exports = new QuestionController();