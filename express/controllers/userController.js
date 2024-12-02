const { User } = require('../models/models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const fs = require('fs');

const multer = require('multer');
const path = require('path');

// Настройка хранилища для multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../project/public/data/diplomas'));
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage }); 

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
    
            res.status(200).json({ phone: user.phone, 
                                    name: user.name, 
                                    surname: user.surname, 
                                    sex: user.sex,  
                                    userId: user.idUser, 
                                    trAim: user.trAim,
                                    birthdate: user.birthdate,
                                    role: user.role,
                                    finishedTr: user.finishedTr}); 
        } catch (error) {
            console.error('Ошибка при аутентификации:', error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
     
    async logoutUser(req, res) {
        try {
            req.session = null;
    
            res.status(200).json({ message: 'Вы успешно вышли из системы' });
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    // Метод для изменения роли пользователя и загрузки диплома
    async becomeCoach(req, res) {
        try {
            const diplomaFile = req.file; // Получаем загруженный файл
    
            // Проверяем, загружен ли файл
            if (!diplomaFile) {
                return res.status(400).json({ message: 'Файл диплома не загружен.' });
            }
    
            const fileName = diplomaFile.filename; // Имя файла уже установлено multer
            const userId = req.body.userId; // Получаем userId
            const user = await User.findByPk(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден.' });
            }
    
            // Обновляем пользователя
            user.role = 'trainer';
            user.diploma = fileName;
    
            await user.save();
            return res.status(200).json(user);
        } catch (error) {
            console.error('Ошибка при обработке запроса:', error);
            return res.status(500).json({ message: 'Ошибка при изменении роли.', details: error.message });
        }
    }

    async updateTrainingAim(req, res) {
        console.log('Request body:', req.body); 
        const { userId, trAim } = req.body;
        console.log('Received:', { userId, trAim });
    
        try {
            if (!userId || trAim == null) {
                return res.status(400).json({ message: 'Invalid input: userId or trAim is missing' });
            }
    
            const [updated] = await User.update({ trAim }, { where: { id: userId } });
    
            if (updated) {
                const updatedUser = await User.findOne({ where: { id: userId } });
                return res.status(200).json(updatedUser);
            }
    
            throw new Error('User not found');
        } catch (error) {
            console.error('Error updating training aim:', error);
            return res.status(500).json({ message: error.message });
        }
    }
    // async addTraining(req, res) {
    //     if (!userId) {
    //         console.error('User ID is missing');
    //         return;
    //     }
    
    //     const newFinishedTr = finishedTr + 1;
    //     setfinishedTr(newFinishedTr);
    
    //     console.log('Updating finished trainings for user ID:', userId);
    
    //     try {
    //         const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ finishedTr: newFinishedTr }),
    //         });
    
    //         if (!response.ok) {
    //             throw new Error('Ошибка при обновлении данных о выполненных тренировках');
    //         }
    
    //         const updatedData = await response.json();
    //         setfinishedTr(updatedData.finishedTr);
    //     } catch (error) {
    //         console.error('Ошибка при добавлении выполненной тренировки:', error);
    //     }
    // }
}

module.exports = new UserController();