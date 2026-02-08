const { Product, MealLog } = require('../models/models');
const { Op } = require('sequelize');

class CalorieController {
    // Поиск продукта в общей базе
    async searchProduct(req, res) {
        try {
            const { query } = req.query;
            if (!query) return res.json([]);

            const products = await Product.findAll({
                where: {
                    productName: { [Op.iLike]: `%${query}%` }
                },
                limit: 10
            });
            return res.json(products);
        } catch (e) {
            return res.status(500).json({ message: "Ошибка поиска" });
        }
    }

    // Добавление записи в лог (дневник)
    async addMealLog(req, res) {
        try {
            const { productId, grams, userId, mealType } = req.body;
            
            // Находим эталонный продукт
            const product = await Product.findByPk(productId);
            if (!product) return res.status(404).json({ message: "Продукт не найден" });

            // Создаем запись в дневнике, копируя КБЖУ
            const logEntry = await MealLog.create({
                userId,
                mealType, // 'breakfast', 'lunch' и т.д.
                grams,
                recordedProductName: product.productName,
                recordedCalories: product.calories,
                recordedProtein: product.protein,
                recordedFat: product.fat,
                recordedCarbs: product.carbs,
                date: new Date() // Только дата без времени, если используете DATEONLY
            });

            return res.json(logEntry);
        } catch (e) {
            return res.status(500).json({ message: "Ошибка сохранения записи" });
        }
    }

    // Получение всех записей за сегодня для юзера
    async getTodaysLogs(req, res) {
        try {
            const { userId } = req.params;
            const logs = await MealLog.findAll({
                where: {
                    userId,
                    date: new Date() // Sequelize DATEONLY сравнит только YYYY-MM-DD
                }
            });
            return res.json(logs);
        } catch (e) {
            return res.status(500).json({ message: "Ошибка получения данных" });
        }
    }
}

module.exports = new CalorieController();