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
        muscles
      } = req.body;

      const predominantMuscleGroupStr = Array.isArray(predominantMuscleGroup)
        ? predominantMuscleGroup.join(',')
        : String(predominantMuscleGroup);

      // Собираем только нужные поля — не весь req.body
      const payload = {
        exName,
        experience,
        predominantMuscleGroup: predominantMuscleGroupStr,
        baseIsolation,
        type,
        restrictions,
        ...muscles
      };

      console.log('Creating exercise with payload:', payload);

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
                limit,
                offset,
            });
            return res.json({ total: count, page, exercises: rows });
        } catch (error) {
            console.error('Ошибка при получении упражнений:', error);
            return res.status(500).json({ message: 'Ошибка при получении упражнений' });
        }
    }
}

module.exports = new exerciseController();
