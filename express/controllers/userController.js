const { User } = require('../models/models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

class UserController {
    // Создание новой записи
    async create(req, res) {
        try {
            const { surname, name, phone, password, birthdate, sex, role } = req.body;
            const user = await User.create({ surname, name, phone, password, birthdate, sex, role });
            return res.status(201).json(user);
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при создании пользователя' });
        }
    }

    // Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;
            const { count, rows } = await User.findAndCountAll({
                limit,
                offset,
            });
            return res.json({ total: count, page, users: rows });
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            return res.status(500).json({ message: 'Ошибка при получении пользователей' });
        }
    }

    // Получение списка записей с поддержкой сортировки
    async getAllSorted(req, res) {
        try {
            const { sortBy = 'surname', order = 'ASC' } = req.query;
            const users = await User.findAll({
                order: [[sortBy, order]],
            });
            return res.json(users);
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            return res.status(500).json({ message: 'Ошибка при получении пользователей' });
        }
    }

    // Получение списка записей с поддержкой фильтрации
    async getAllFiltered(req, res) {
        try {
            const { surname, role } = req.query;
            const where = {};
            if (surname) where.surname = surname;
            if (role) where.role = role;

            const users = await User.findAll({ where });
            return res.json(users);
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            return res.status(500).json({ message: 'Ошибка при получении пользователей' });
        }
    }

    // Получение списка записей с поддержкой поиска
    async search(req, res) {
        try {
            const { query } = req.query;
            const users = await User.findAll({
                where: {
                    [Op.or]: [
                        { surname: { [Op.like]: `%${query}%` } },
                        { name: { [Op.like]: `%${query}%` } },
                        { phone: { [Op.like]: `%${query}%` } },
                    ],
                },
            });
            return res.json(users);
        } catch (error) {
            console.error('Ошибка при поиске пользователей:', error);
            return res.status(500).json({ message: 'Ошибка при поиске пользователей' });
        }
    }

    // Получение детальной информации по ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            return res.json(user);
        } catch (error) {
            console.error('Ошибка при получении пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при получении пользователя' });
        }
    }

    // Обновление записи
    async update(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await User.update(req.body, {
                where: { idUser: id },
            });
            if (!updated) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            const updatedUser = await User.findByPk(id);
            return res.json(updatedUser);
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при обновлении пользователя' });
        }
    }

    // Удаление записи
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await User.destroy({
                where: { idUser: id },
            });
            if (!deleted) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            return res.status(204).send();
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при удалении пользователя' });
        }
    }

    // Проверка существования записи
    async exists(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            return res.json({ exists: !!user });
        } catch (error) {
            console.error('Ошибка при проверке существования пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при проверке существования пользователя' });
        }
    }

    async getChecked(req, res) {
        try {
            const { phone, password } = req.body;
    
            const user = await User.findOne({ where: { phone } });
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            if (password !== user.password) {
                return res.status(401).json({ message: 'Неверный пароль' });
            }
    
            res.status(200).json({ phone: user.phone, name: user.name }); // Возвращаем данные пользователя
        } catch (error) {
            console.error('Ошибка при аутентификации:', error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports = new UserController();