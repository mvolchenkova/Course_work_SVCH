const { User, TrainingPlan, Note } = require('../models/models');
const { Op } = require('sequelize');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');
const uuid = require('uuid')

const dotenv = require('dotenv');
dotenv.config();

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'static', 'diplomas'));
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

class UserController {
    // Создание новой записи
    async create(req, res) {
        const validationRules = [
            body('name').notEmpty().withMessage('Name required').isLength({ min: 2 }).withMessage('The name must be at least 2 characters'),
            body('surname').notEmpty().withMessage('Surname required').isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
            body('phone').notEmpty().withMessage('Phone required').withMessage('Invalid phone number format'),
            body('password').notEmpty().withMessage('Password required').isLength({ min: 6 }).withMessage('The password must be at least 6 characters'),
            body('sex').isIn(['male', 'female']).withMessage('Sex should be male/female'), 
        ];
    
        await Promise.all(validationRules.map(validation => validation.run(req)));
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
    
        try {
            const { surname, name, phone, password, birthdate, sex, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 15);
    
    const user = await User.create({ surname, name, phone, password: hashPassword, birthdate, sex, role });
    
    // Вместо просто json(user), вернем объект явно, чтобы убедиться, что idUser там есть
    return res.status(201).json({
        idUser: user.idUser, // Вот этот ключ критически важен!
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        role: user.role
    });}
     catch (error) {
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
            const user = await User.findByPk(id)
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
    
            const { trAim, finishedTr, password, role } = req.body;
            if(password){
                var hashPassword = await bcrypt.hash(password, 15);
            }
            
            const updated = await user.update({ trAim, finishedTr, password: hashPassword, role });
            console.log('Обновленный пользователь:', updated);
    
            return res.json(updated); // Возвращаем обновленного пользователя
        } catch (error) {
            console.error('Ошибка при обновлении пользователя: '+ error);
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

    // временно без строгой проверки номера
    if (!phone || !password) {
      return res.status(400).json({ message: 'Phone and password required' });
    }

    const user = await User.findOne({ where: { phone } });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    if (user.isBlocked) {
      return res.status(401).json({ message: 'Вы заблокированы. Вход невозможен.' });
    }

    const token = jwt.sign({ id: user.idUser }, process.env.SECRETKEY, { expiresIn: '1h' });

    res.status(200).json({
      token,
      user: {
        phone: user.phone,
        name: user.name,
        surname: user.surname,
        sex: user.sex,
        userId: user.idUser,
        trAim: user.trAim,
        birthdate: user.birthdate,
        role: user.role,
        finishedTr: user.finishedTr
      }
    });

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
            const { id } = req.params;
            const { diploma } = req.body;
    
            console.log('User ID:', id);
    
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }
    
            user.role = "trainer"; 
            user.diploma = diploma
            await user.save();
    
            res.json({ message: "File uploaded successfully and role updated.", user: user });
        } catch (error) {
            console.error("Error in becomeCoach:", error);
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


    async addFavoritePlan(req, res) {
        try {
            const {idTplan} = req.body;
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            let plans = Object.assign([], user.favPlans);
            let plans1 = Object.assign([], plans.filter(plan => plan != idTplan))


            if (!user.favPlans.includes(idTplan)) {
                console.log("1 " + JSON.stringify(user) )
                plans.push(idTplan)
                await user.update({
                    favPlans: plans
                })

               
            }
            else{
                await user.update({
                    favPlans: plans1
                })
            }
            
                res.status(200).json(user);
        } catch (error) {
            console.error('Ошибка при добавлении плана в избранное:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }


    async addFavoriteRecipe(req, res) {
        try {
            const {idRecipe} = req.body;
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            let recipes = Object.assign([], user.favRecipes);
            let recipes1 = Object.assign([], recipes.filter(recipe => recipe != idRecipe))


            if (!user.favRecipes.includes(idRecipe)) {
                console.log("1 " + JSON.stringify(user) )
                recipes.push(idRecipe)
                await user.update({
                    favRecipes: recipes
                })

               
            }
            else{
                await user.update({
                    favRecipes: recipes1
                })
            }
            
                res.status(200).json(user);
        } catch (error) {
            console.error('Ошибка при добавлении плана в избранное:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    async getUserNotes(req, res) {
        try {
            const { userId } = req.params;

            const notes = await Note.findAll({
            where: { idUser: userId },
            });

            res.json(notes);
        } catch (err) {
            console.error("🔥 ERROR:", err);
            res.status(500).json({ message: err.message });
        }
        }
    async addUserNote(req, res) {
        try {
            const note = await Note.create({
            text: req.body.text,
            idUser: req.params.userId
            });

            res.status(201).json(note);
        } catch (err) {
            res.status(500).json({ message: 'Error adding note' });
        }
    }
    async deleteUserNote(req, res){
        try {
            const {noteId} = req.params
            await Note.destroy({
            where: { id: noteId }
            });

            res.json({ message: 'Note deleted' });
        } catch (err) {
            console.error("🔥 ERROR:", err);
            res.status(500).json({ message: 'Error deleting note' });
        }
    }
    async updateUserNote(req, res) {
        try {
            const { noteId } = req.params;
            const { text } = req.body;

            const note = await Note.findByPk(noteId);
            if (!note) return res.status(404).json({ message: 'Note not found' });

            note.text = text;
            await note.save();

            res.json(note);
        } catch (err) {
            console.error("🔥 ERROR:", err);
            res.status(500).json({ message: 'Error updating note' });
        }
    }

    async uploadAvatar(req, res) {
        try {
            const { userId } = req.body;
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: 'Файл не выбран' });
            }

            const avatarPath = `/uploads/avatars/${file.filename}`;

            // Обновляем в БД
            await User.update(
                { avatar: avatarPath },
                { where: { idUser: userId } }
            );

            // Возвращаем путь, чтобы фронтенд обновил состояние
            return res.json({ avatar: avatarPath });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при сохранении аватара' });
        }
    }
}

module.exports = new UserController();