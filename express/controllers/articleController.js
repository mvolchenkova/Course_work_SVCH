const { Article } = require('../models/models');
const multer = require('multer');
const path = require('path');

// Настройка хранилища для Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static/articles'); 
    },
    filename: (req, file, cb) => {
        // Генерация уникального имени файла
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

// Контроллер статей
class ArticleController {

    // Создание новой записи
    async create(req, res) {
        try {
            const { title, author } = req.body;
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }
            const content = req.file.path;
            const article = await Article.create({ title, content, author });
            res.status(201).json(article);
        } catch (error) {
            console.error('Error creating article:', error);
            res.status(500).json({ message: error.message || 'Server error' });
        }
    }

    // Получение статьи по ID
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

    async fetchArticles(req, res) {
        try {
            const articles = await Article.findAll(); // Получаем все статьи из базы данных
            return res.json(articles); // Возвращаем статьи в формате JSON
        } catch (error) {
            console.error('Ошибка при получении статей:', error);
            return res.status(500).json({ message: 'Ошибка при получении статей' });
        }
    }
}

// Экспорт контроллера
module.exports = {
    articleController: new ArticleController(),
    upload // Экспортируем upload для использования в маршрутах
};