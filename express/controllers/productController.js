// Подключаем модель из твоего файла моделей
const { Product } = require('../models/models'); 
const { Op } = require('sequelize');

const productController = {
    createProduct: async (req, res) => {
        try {
            const { name, calories, protein, fat, carbs } = req.body;

            if (!name) {
                return res.status(400).json({ message: "Название продукта обязательно" });
            }

            const newProduct = await Product.create({
                productName: name, 
                calories: calories || 0,
                protein: protein || 0,
                fat: fat || 0,
                carbs: carbs || 0
            });

            res.status(201).json(newProduct);
        } catch (error) {
            console.error("Ошибка при создании продукта:", error);
            res.status(500).json({ message: "Ошибка сервера при сохранении продукта" });
        }
    },

   getAllProducts: async (req, res) => {
        try {
            // Извлекаем параметры из запроса
            const { search, limit, offset } = req.query;
            
            // Настройка фильтрации
            let whereCondition = {};
            if (search) {
                whereCondition = {
                    productName: {
                        [Op.iLike]: `%${search}%` // Поиск подстроки (только для Postgres)
                        // Если используешь другую БД, замени на [Op.like]
                    }
                };
            }

            // Настройка пагинации
            const queryLimit = limit ? parseInt(limit) : 5;
            const queryOffset = offset ? parseInt(offset) : 0;

            const { count, rows } = await Product.findAndCountAll({
                where: whereCondition,
                limit: queryLimit,
                offset: queryOffset,
                order: [['productName', 'ASC']]
            });
            
            // Возвращаем объект с продуктами и общим количеством
            res.json({ products: rows, totalCount: count });
        } catch (error) {
            console.error("Ошибка в контроллере:", error);
            res.status(500).json({ message: "Ошибка поиска" });
        }
    }
};

module.exports = productController;