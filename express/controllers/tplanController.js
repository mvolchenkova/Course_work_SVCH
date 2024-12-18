const { TrainingPlan } = require('../models/models')
const { Op } = require('sequelize');
const uuid =require("uuid")
const path=require("path")
class tplanController {
   
    // Создание новой записи
    async create(req, res) {
        try {
            const { author, title, amount, description } = req.body;
    
            console.log(req.files);
    
            const { img, lesson } = req.files; 
            
            if (!img || !lesson) {
                return res.status(400).json({ message: 'Image or lesson files not provided' });
            }
    
            // Handle the image upload
            const imgFileName = uuid.v4() + ".jpg"; // Generate unique filename for image
            await img.mv(path.resolve(__dirname, '..', 'static', imgFileName)); // Move the image to the static folder
    
            // Initialize lessons array
            const lessons = [];
            const videoFiles = Array.isArray(lesson) ? lesson : [lesson]; // Ensure it's an array
    
            // Process each video file
            for (let i = 0; i < videoFiles.length; i++) {
                const videoFile = videoFiles[i];
                const vidFileName = uuid.v4() + ".mp4"; 
                await videoFile.mv(path.resolve(__dirname, '..', 'static', vidFileName));
    
                lessons.push(vidFileName); 
            }
    
            const tplan = await TrainingPlan.create({
                author,
                title,
                amount,
                img: imgFileName,
                description,
                lessons
            });
            
            return res.status(201).json(tplan);
    
        } catch (error) {
            console.error('Error creating training plan:', error);
            return res.status(500).json({ message: 'Error creating training plan' });
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
    
            // Если query пустой, возвращаем все тренировочные планы
            if (!query) {
                const trainingplans = await TrainingPlan.findAll();
                return res.json(trainingplans);
            }
    
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
            console.log('Received ID:', id); 
            const numericId = parseInt(id, 10); 
    
            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
    
            const tplan = await TrainingPlan.findByPk(numericId);
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
    


    async findFavPlans(req, res) {
        try {
            const favPlans = req.query.favPlans; 
    
            if (!favPlans) { 
              return res.status(400).json({ error: "favPlans parameter is missing" });
            }
    
            const parsedFavPlans = JSON.parse(favPlans); 
    
            const trainingPlans = [];
    
            for (let index = 0; index < parsedFavPlans.length; index++) {
                const element = parsedFavPlans[index];
                const plan = await TrainingPlan.findByPk(element);
                console.log(plan)
                if (plan) {
                    trainingPlans.push(plan);
                }
            }
    
            if (trainingPlans.length > 0) {
                res.json(trainingPlans);
            } else {
                res.status(404).json({ error: "No matching training plans found." });
            }
        } catch (error) {
            console.error("Ошибка при получении тренировочных планов:", error);
            res.status(500).json({ error: "Ошибка сервера" });
        }
    }
}

module.exports = new tplanController();