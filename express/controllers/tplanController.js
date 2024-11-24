const { TrainingPlan } = require('../models/models')
const { Op } = require('sequelize');

class tplanController {
    
    // Создание новой записи
    async create(req, res) {
        try {
            const{ idTplan, author, title, amount, img } = req.body
            const tplan = await TrainingPlan.create({ idTplan, author, title, amount, img });
            return res.status(201).json(tplan);
        } catch (error) {
            console.error('Ошибка при создании тренировочного плана:', error);
            return res.status(500).json({ message: 'Ошибка при создании тренировочного плана' });
        }
    }

    // Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;
            const { count, rows } = await TrainingPlan.findAndCountAll({
                limit,
                offset,
            });
            return res.json({ total: count, page, trainingplans: rows });
        } catch (error) {
            console.error('Ошибка при получении тренировочных планов:', error);
            return res.status(500).json({ message: 'Ошибка при получении тренировочных планов' });
        }
    }

     // Получение списка записей с поддержкой сортировки
     async getAllSorted(req, res) {
        try {
            const { sortBy = 'title', order = 'ASC' } = req.query;
            const trainingplans = await TrainingPlan.findAll({
                order: [[sortBy, order]],
            });
            return res.json(trainingplans);
        } catch (error) {
            console.error('Ошибка при получении тренировочных планов:', error);
            return res.status(500).json({ message: 'Ошибка при получении тренировочных планов' });
        }
    }

    // Получение списка записей с поддержкой фильтрации
    async getAllFiltered(req, res) {
        try {
            const { author, title } = req.query;
            const where = {};
            if (author) where.author = author;
            if (title) where.title = title;

            const trainingplans = await TrainingPlan.findAll({ where });
            return res.json(trainingplans);
        } catch (error) {
            console.error('Ошибка при получении тренировочных планов:', error);
            return res.status(500).json({ message: 'Ошибка при получении тренировочных планов' });
        }
    }

    // Получение списка записей с поддержкой поиска
    async search(req, res) {
        try {
            const { query } = req.query;
            const trainingplans = await TrainingPlan.findAll({
                where: {
                    [Op.or]: [
                        { author: { [Op.like]: `%${query}%` } },
                        { title: { [Op.like]: `%${query}%` } },
                    ],
                },
            });
            return res.json(trainingplans);
        } catch (error) {
            console.error('Ошибка при поиске тренировочных планов:', error);
            return res.status(500).json({ message: 'Ошибка при поиске тренировочных планов' });
        }
    }

    // Получение детальной информации по ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const tplan = await TrainingPlan.findByPk(id);
            if (!tplan) {
                return res.status(404).json({ message: 'Тренировочный план не найден' });
            }
            return res.json(tplan);
        } catch (error) {
            console.error('Ошибка при получении тренировочного плана:', error);
            return res.status(500).json({ message: 'Ошибка при получении тренировочного плана' });
        }
    }

    // Обновление записи
    async update(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await TrainingPlan.update(req.body, {
                where: { idTplan: id },
            });
            if (!updated) {
                return res.status(404).json({ message: 'Тренировочный план не найден' });
            }
            const updatedPlan = await TrainingPlan.findByPk(id);
            return res.json(updatedPlan);
        } catch (error) {
            console.error('Ошибка при обновлении тренировочного плана:', error);
            return res.status(500).json({ message: 'Ошибка при обновлении тренировочного плана' });
        }
    }

    // Удаление записи
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await TrainingPlan.destroy({
                where: { idTplan: id },
            });
            if (!deleted) {
                return res.status(404).json({ message: 'Тренировочный план не найден' });
            }
            return res.status(204).send();
        } catch (error) {
            console.error('Ошибка при удалении тренировочного плана:', error);
            return res.status(500).json({ message: 'Ошибка при удалении тренировочного плана' });
        }
    }

    // Проверка существования записи
    async exists(req, res) {
        try {
            const { id } = req.params;
            const tplan = await TrainingPlan.findByPk(id);
            return res.json({ exists: !!tplan });
        } catch (error) {
            console.error('Ошибка при проверке существования тренировочного плана:', error);
            return res.status(500).json({ message: 'Ошибка при проверке существования тренировочного плана' });
        }
    }
}

module.exports = new tplanController();