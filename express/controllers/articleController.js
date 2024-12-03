const { Article } = require('../models/models');

class ArticleController{

    // Создание новой записи
    async create(req, res) {
        try {
            const { title, content, author } = req.body;
            const article = await Article.create({ title, content, author });
            return res.status(201).json(article);
        } catch (error) {
            console.error('Ошибка при создании статьи:', error);
            return res.status(500).json({ message: 'Ошибка при создании статьи' });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const article = await Article.findByPk(id);
            if (!article) {
                return res.status(404).json({ message: 'Статья не найдена' });
            }
            return res.json(article);
        } catch (error) {
            console.error('Ошибка при получении статьи:', error);
            return res.status(500).json({ message: 'Ошибка при получении статьи' });
        }
    }
}

module.exports = new ArticleController();