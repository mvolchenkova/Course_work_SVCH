const { Review } = require('../models/models');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

class ReviewController {
    async create(req, res) {
        try {
            console.log(req.body)
            const { idUser, text, rating } = req.body;
            
            const review = await Review.create({ idUser, text, rating });
            return res.status(201).json(review);
        } catch (error) {
            console.error('Ошибка при создании отзыва:', error);
            return res.status(500).json({ message: 'Ошибка при создании отзыва' });
        }
    }
    async getAll(req, res) {
        try {
            const reviews = await Review.findAll(); // Получаем все отзывы
            return res.json(reviews);
        } catch (error) {
            console.error('Ошибка при получении отзывов:', error);
            return res.status(500).json({ message: 'Ошибка при получении отзывов' });
        }
    }
    async getAllpages(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;
            const { count, rows } = await Review.findAndCountAll({
                limit,
                offset,
            });
            return res.json({ total: count, page, reviews: rows });
        } catch (error) {
            console.error('Ошибка при получении вопросов:', error);
            return res.status(500).json({ message: 'Ошибка при получении вопросов' });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params; // Получаем id из параметров
            const deletedReview = await Review.destroy({
                where: { idReview: id }
            });

            if (!deletedReview) {
                return res.status(404).json({ message: 'Отзыв не найден' });
            }

            return res.status(204).send(); // Успешное удаление, без содержимого
        } catch (error) {
            console.error('Ошибка при удалении отзыва:', error);
            return res.status(500).json({ message: 'Ошибка при удалении отзыва' });
        }
    }
}

module.exports = new ReviewController();