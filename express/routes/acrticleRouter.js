const express = require('express');
const router = express.Router();
const { articleController, upload } = require('../controllers/articleController');

// Маршрут для создания статьи
router.post('/', upload.single('file'), articleController.create);
router.get('/fetchArticles', articleController.fetchArticles);
router.get('/:id', articleController.getById);

module.exports = router;