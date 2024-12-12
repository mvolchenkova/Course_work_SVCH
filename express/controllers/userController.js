const { User } = require('../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'static', 'diplomas'));
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname)); // Генерация уникального имени файла
    }
});

const upload = multer({ storage: storage });

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
            const id = req.params.id;
            
            if (!id) {
                return res.status(400).json({ message: 'ID пользователя не указан' });
            }
    
            console.log('ID пользователя:', id);
            console.log('Данные для обновления:', req.body);
    
            const user = await User.findByPk(id);
            console.log('Найденный пользователь:', user);
    
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            const { trAim, finishedTr, password } = req.body;
            const updated = await user.update({ trAim, finishedTr, password });
            console.log('Обновленный пользователь:', updated);
    
            return res.json(updated); // Возвращаем обновленного пользователя
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
            return res.status(500).json({ message: 'Ошибка при обновлении пользователя' });
        }
    }
    
    // Удаление записи
    async delete(req, res) {
        try {
            const { userId } = req.params;
            const deleted = await User.destroy({ where: { idUser: userId } });
    
            if (!deleted) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            return res.status(204).send(); // Successfully deleted
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Server error' });
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
            console.log(user)
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            if (password !== user.password) {
                return res.status(401).json({ message: 'Неверный пароль' });
            }


            if (user.isBlocked) {
                console.error('Пользователь заблокирован:', user.phone);
                return res.status(401).json({ message: 'Вы заблокированы. Вход невозможен.' });
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
    async  becomeCoach(req, res) {
        try {
            const diplomaFile = req.file; // Получаем загруженный файл
            console.log('Полученный файл:', diplomaFile);
            console.log('Полученный userId:', req.body.userId);

            if (!diplomaFile) {
                return res.status(400).json({ message: 'Файл диплома не загружен.' });
            }

            // Убедимся, что файл уже перемещен multer
            const fileName = diplomaFile.filename; // Используем имя файла, сгенерированное multer

            const userId = req.body.userId;
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден.' });
            }

            // Обновляем пользователя
            user.role = 'trainer';
            user.diploma = fileName; // Сохраняем имя файла

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

    async addTraining(req, res) {
        const userId = req.body
        if (!userId) {
            console.error('User ID is missing');
            return;
        }
    
        const newFinishedTr = finishedTr + 1;
        setfinishedTr(newFinishedTr);
    
        console.log('Updating finished trainings for user ID:', userId);
    
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ finishedTr: newFinishedTr }),
            });
    
            if (!response.ok) {
                throw new Error('Ошибка при обновлении данных о выполненных тренировках');
            }
    
            const updatedData = await response.json();
            setfinishedTr(updatedData.finishedTr);
        } catch (error) {
            console.error('Ошибка при добавлении выполненной тренировки:', error);
        }
    }

    async block(req, res) {
        const { id } = req.params;
        const user = await User.findByPk(id);
        
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.isBlocked = !user.isBlocked; 
        await user.save();

        res.json(user);
    }
    
}

module.exports = new UserController();