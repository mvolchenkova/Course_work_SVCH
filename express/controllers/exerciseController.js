const { Exercise } = require('../models/models');

class exerciseController {
  async create(req, res) {
    try {
      const {
        exName,
        experience,
        predominantMuscleGroup,
        baseIsolation,
        type,
        restrictions,
        equipment, 
        muscles
      } = req.body;

      const predominantMuscleGroupStr = Array.isArray(predominantMuscleGroup)
        ? predominantMuscleGroup.join(',')
        : String(predominantMuscleGroup);

      const payload = {
        exName,
        experience,
        predominantMuscleGroup: predominantMuscleGroupStr,
        baseIsolation,
        type,
        restrictions,
        equipment,
        ...muscles
      };

      const exercise = await Exercise.create(payload);
      return res.status(201).json(exercise);
    } catch (error) {
      console.error('Ошибка при создании упражнения:', error);
      return res.status(500).json({
        message: 'Ошибка при создании упражнения',
        error: error.errors?.map(e => e.message) || error.message
      });
    }
  }

  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const { count, rows } = await Exercise.findAndCountAll({
        limit: Number(limit),
        offset: Number(offset),
        raw: true, // 👈 чтобы вернуть plain-объекты
      });

      return res.json({ total: count, page: Number(page), exercises: rows });
    } catch (error) {
      console.error('Ошибка при получении упражнений:', error);
      return res.status(500).json({ message: 'Ошибка при получении упражнений' });
    }
  }

  async getRandomExercises(req, res) {
    try {
      const trAmount = parseInt(req.query.amount, 10);
      const n = 5; // сколько упражнений в наборе
      const possibleReps = [8, 10, 12, 15, 20];

      if (!trAmount || trAmount <= 0) {
        return res.status(400).json({ error: 'Некорректное значение trAmount' });
      }

      // Получаем все id
      const allIdsResult = await Exercise.findAll({
        attributes: ['idExercise'],
        raw: true,
      });

      const allIds = allIdsResult.map(row => row.idExercise);

      if (allIds.length < n) {
        return res.status(400).json({ error: 'Недостаточно упражнений в базе данных' });
      }

      const result = [];

      for (let i = 0; i < trAmount; i++) {
        // Перемешиваем и берём n случайных ID
        const shuffled = [...allIds].sort(() => Math.random() - 0.5);
        const selectedIds = shuffled.slice(0, n);

        const set = await Exercise.findAll({
          where: { idExercise: selectedIds },
          raw: true,
        });

        // 👇 добавляем reps каждому упражнению
        const setWithReps = set.map(exercise => ({
          ...exercise,
          reps: possibleReps[Math.floor(Math.random() * possibleReps.length)],
        }));

        result.push(setWithReps);
        // console.log("Workout set with reps:", setWithReps);
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error('Ошибка при получении случайных упражнений:', error);
      return res.status(500).json({ error: 'Ошибка сервера при получении данных' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!id) {
        return res.status(400).json({ message: 'ID упражнения не указан' });
      }

      if (Array.isArray(updateData.predominantMuscleGroup)) {
        updateData.predominantMuscleGroup = updateData.predominantMuscleGroup.join(',');
      }

      const [updatedRowsCount] = await Exercise.update(updateData, {
        where: { idExercise: id },
      });

      if (updatedRowsCount === 0) {
        return res.status(404).json({ message: 'Упражнение не найдено или данные не изменились' });
      }

      const updatedExercise = await Exercise.findOne({
        where: { idExercise: id },
        raw: true,
      });

      return res.status(200).json(updatedExercise);
    } catch (error) {
      console.error('Ошибка при обновлении упражнения:', error);
      return res.status(500).json({
        message: 'Ошибка при обновлении упражнения',
        error: error.errors?.map(e => e.message) || error.message,
      });
    }
  }
}

module.exports = new exerciseController();
