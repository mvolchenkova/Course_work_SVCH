const { MealLog, Product } = require('../models/models');
const { Op } = require('sequelize');

const mealLogController = {

    addEntry: async (req, res) => {
        try {
            console.log('BODY:', req.body);

            const {
                idUser,
                productId,
                mealType,
                grams,
                recordedCalories,
                recordedProtein,
                recordedFat,
                recordedCarbs
            } = req.body;

            if (!idUser || !productId || !mealType || !grams) {
                return res.status(400).json({ message: 'Нет данных' });
            }

            const newLog = await MealLog.create({
                idUser: Number(idUser),
                idProduct: Number(productId),
                mealType,
                grams: Number(grams),
                recordedCalories: Number(recordedCalories) || 0,
                recordedProtein: Number(recordedProtein) || 0,
                recordedFat: Number(recordedFat) || 0,
                recordedCarbs: Number(recordedCarbs) || 0,
                date: new Date()
            });

            return res.status(201).json(newLog);

        } catch (e) {
            console.error('ADD LOG ERROR:', e);
            res.status(500).json({ message: 'Ошибка записи', error: e.message });
        }
    },

   getLogsByUser: async (req, res) => {
        try {
            const { idUser, date } = req.query; // Получаем дату '2026-02-10' из фронтенда

            const logs = await MealLog.findAll({
                where: {
                    idUser: idUser,
                    // Фильтруем так, чтобы createdAt попадал в диапазон выбранного дня
                    createdAt: {
                        [Op.gte]: new Date(date + 'T00:00:00Z'),
                        [Op.lte]: new Date(date + 'T23:59:59Z')
                    }
                },
                include: [{ model: Product, as: 'product' }]
            });
            res.json(logs);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    // mealLogController.js
deleteEntry: async (req, res) => {
    try {
        const { id } = req.params;
        console.log("--> Пытаемся удалить лог с ID:", id);

        // ВАЖНО: Посмотри в pgAdmin, как называется колонка ID в таблице meal_logs
        // Если она называется просто 'id', замени 'idLog' на 'id' ниже:
        const deleted = await MealLog.destroy({
            where: { id: id } // <--- СКОРЕЕ ВСЕГО, ТУТ ДОЛЖНО БЫТЬ ПРОСТО id
        });

        if (deleted) {
            console.log("--> Успешно удалено!");
            return res.status(204).send();
        } else {
            console.log("--> Запись в базе не найдена!");
            return res.status(404).json({ message: "Запись не найдена в БД" });
        }
    } catch (e) {
        console.error("!!! Ошибка удаления:", e.message);
        res.status(500).json({ error: e.message });
    }
}
};

module.exports = mealLogController;
