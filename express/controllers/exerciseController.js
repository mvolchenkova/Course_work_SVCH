const { Exercise, Muscle,ExerciseMuscle } = require('../models/models');
const { Op } = require("sequelize");
const sequelize = require('../db');

const RESTRICTION_MAP = {
  'back': 'поясниц',
  'knees': 'колен',
  'shoulders': 'плеч',
  'neck': 'шеи',
  'elbows': 'локт',
  'cardio': 'сердце'
};
const HEALTH_RESTRICTIONS = ['back', 'knees', 'shoulders', 'neck', 'elbows', 'cardio'];
class exerciseController {
 async create(req, res) {
  const t = await sequelize.transaction();
  
  try {
    // 1. Получаем данные из body. 
    // ВАЖНО: Если данные шлются через FormData, muscles будет строкой JSON!
    let {
      exName,
      experience,
      baseIsolation,
      type,
      restrictions,
      equipment,
      technique,
      muscles 
    } = req.body;

    // 2. Обработка видеофайла от multer
    const videoPath = req.file ? req.file.path : null;

    // 3. Создаем упражнение (ОДИН РАЗ)
    const exercise = await Exercise.create({
      exName,
      experience,
      baseIsolation,
      type,
      restrictions,
      equipment,
      technique,
      videoPath // Не забудьте добавить это поле в модель!
    }, { transaction: t });

    // 4. Обработка мышц
    if (muscles) {
      // Если muscles пришли строкой (из-за FormData), парсим их
      const parsedMuscles = typeof muscles === 'string' ? JSON.parse(muscles) : muscles;

      if (Array.isArray(parsedMuscles) && parsedMuscles.length > 0) {
        const muscleAssociations = parsedMuscles.map(m => ({
          idExercise: exercise.idExercise,
          idMuscle: m.idMuscle,
          loadValue: m.loadValue || 0,
          isPrimary: m.isPrimary !== undefined ? m.isPrimary : true
        }));

        await ExerciseMuscle.bulkCreate(muscleAssociations, { transaction: t });
      }
    }

    // 5. Фиксируем транзакцию
    await t.commit();

    // 6. Получаем полные данные для ответа (включая связи)
    const createdExercise = await Exercise.findByPk(exercise.idExercise, {
      include: [{
        model: Muscle,
        as: 'muscles', // Убедитесь, что alias совпадает с моделью
        through: { attributes: ['loadValue', 'isPrimary'] }
      }]
    });

    return res.status(201).json(createdExercise);

  } catch (error) {
    if (t) await t.rollback();
    console.error('Ошибка при создании упражнения:', error);
    return res.status(500).json({
      message: 'Ошибка при создании упражнения',
      error: error.message
    });
  }
}

  async getAll(req, res) {
    try {
      let { page, limit, experience, type, equipment, search } = req.query;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 12;
      const offset = (page - 1) * limit;

      const where = {};
      
      // Фильтры
      if (experience) where.experience = experience;
      if (type) where.type = type;
      if (equipment) where.equipment = equipment;
      if (search) {
        where.exName = { [Op.iLike]: `%${search}%` }; // iLike для регистронезависимого поиска
      }

      const { count, rows } = await Exercise.findAndCountAll({
        where,
        limit,
        offset,
        include: [{
          model: Muscle,
          through: { attributes: ['loadValue', 'isPrimary'] }
        }],
        distinct: true, // Важно при использовании include
        order: [['createdAt', 'DESC']]
      });

      return res.json({
        total: count,
        exercises: rows,
        page,
        totalPages: Math.ceil(count / limit)
      });
    } catch (error) {
      console.error('Ошибка getAll:', error);
      return res.status(500).json({ message: "Ошибка при получении упражнений" });
    }
  }

async getRandomExercises(req, res) {
  try {
    const TR_WORKOUTS = Number(req.query.amount) || 3;
    const POPULATION_SIZE = 20;
    const GENERATIONS = 10;
    const MUTATION_RATE = 0.05;
    
    // Параметры с фронтенда
    const experience = req.query.exp || '0-6';
    const userRestrictions = req.query.restrictions || ''; 
    const userEquipment = req.query.equipment || 'gym';

    // 1. Маппинг опыта
    const expMap = {
      '0-6': '0-6 месяцев',
      '6-18': '6-18 месяцев',
      '18+': '18+ месяцев'
    };

    const expLevels = { "0-6 месяцев": 0, "6-18 месяцев": 1, "18+ месяцев": 2 };
    const targetExp = expMap[experience] || '0-6 месяцев';
    const userExpIndex = expLevels[targetExp] ?? 0;

    // Максимальное количество подходов на мышцу в неделю в зависимости от опыта
    const MAX_SETS_PER_MUSCLE_WEEKLY = {
      0: 9,   // 0-6 месяцев
      1: 15,  // 6-18 месяцев
      2: 25   // 18+ месяцев
    };
    const MAX_SETS_PER_WEEK = MAX_SETS_PER_MUSCLE_WEEKLY[userExpIndex];

    // Продвинутым доступны упражнения для новичков
    const allowedLevels = Object.keys(expLevels).filter(key => expLevels[key] <= userExpIndex);

    // 2. Условие для БД
    const whereCondition = {
      experience: { [Op.in]: allowedLevels }
    };

    if (userEquipment !== 'gym' && userEquipment !== '') {
      whereCondition.equipment = userEquipment;
    }

    const allExercisesRaw = await Exercise.findAll({
      where: whereCondition,
      include: [{
        model: Muscle,
        through: { attributes: ['loadValue', 'isPrimary'] }
      }]
    });

    let filteredExercises = allExercisesRaw.map(ex => ex.get({ plain: true }));

    // 3. Фильтрация по здоровью
    if (userRestrictions && RESTRICTION_MAP[userRestrictions]) {
      const keyword = RESTRICTION_MAP[userRestrictions].toLowerCase();
      filteredExercises = filteredExercises.filter(ex => {
        if (!ex.restrictions) return true;
        return !ex.restrictions.toLowerCase().includes(keyword);
      });
    }

    console.log('--- GA DEBUG ---');
    console.log('User Exp Index:', userExpIndex);
    console.log('Max sets per muscle per week:', MAX_SETS_PER_WEEK);
    console.log('Allowed Levels:', allowedLevels);
    console.log('Found in DB:', allExercisesRaw.length);
    console.log('After Health Filter:', filteredExercises.length);

    if (filteredExercises.length < 4) {
      return res.status(400).json({ 
        error: `Найдено всего ${filteredExercises.length} упражнений. Попробуйте изменить фильтры или добавить упражнения в БД.` 
      });
    }

    const allExercises = filteredExercises;
    const possibleReps = [8, 10, 12, 15, 20];
    const possibleSets = [3, 4];
    
    // Количество упражнений в тренировке (случайное от 4 до 8)
    function getRandomExercisesCount() {
      return Math.floor(Math.random() * 5) + 4; // 4-8
    }

    // Функция для создания одной тренировки
    function buildWorkout() {
      const exercisesCount = getRandomExercisesCount();
      
      // Разделяем упражнения на базовые и изолирующие
      const baseExercises = allExercises.filter(ex => 
        ex.baseIsolation && ex.baseIsolation.toLowerCase().includes('баз')
      );
      
      const isolationExercises = allExercises.filter(ex => 
        !ex.baseIsolation || !ex.baseIsolation.toLowerCase().includes('баз')
      );

      // Выбираем базовые упражнения (1-3)
      const baseCount = Math.min(
        Math.floor(Math.random() * 3) + 1, // 1-3 базы
        baseExercises.length
      );
      
      // Перемешиваем и выбираем базовые
      const shuffledBase = [...baseExercises].sort(() => 0.5 - Math.random());
      const selectedBase = shuffledBase.slice(0, baseCount);
      
      // Оставшееся место заполняем изоляцией
      const remainingCount = exercisesCount - baseCount;
      const shuffledIsolation = [...isolationExercises].sort(() => 0.5 - Math.random());
      const selectedIsolation = shuffledIsolation.slice(0, remainingCount);
      
      // Объединяем: сначала база, потом изоляция
      const selectedExercises = [...selectedBase, ...selectedIsolation];
      
      // Добавляем подходы и повторения
      return selectedExercises.map(ex => ({
        ...ex,
        sets: possibleSets[Math.floor(Math.random() * possibleSets.length)],
        reps: possibleReps[Math.floor(Math.random() * possibleReps.length)]
      }));
    }

    // Функция для подсчета подходов на каждую мышцу в неделе
    function countSetsPerMuscle(week) {
      const muscleSets = {};
      
      week.forEach(workout => {
        workout.forEach(exercise => {
          // Получаем целевые мышцы для этого упражнения
          const targetMuscles = exercise.muscles?.filter(m => m.exercise_muscle?.isPrimary) || [];
          
          targetMuscles.forEach(muscle => {
            const muscleId = muscle.idMuscle || muscle.id;
            if (!muscleSets[muscleId]) {
              muscleSets[muscleId] = {
                name: muscle.muscleName || muscle.name,
                sets: 0
              };
            }
            // Добавляем подходы этого упражнения
            muscleSets[muscleId].sets += exercise.sets || 3;
          });
        });
      });
      
      return muscleSets;
    }

    // Проверка на превышение лимита подходов
    function isWeeklyVolumeValid(week) {
      const muscleSets = countSetsPerMuscle(week);
      
      // Проверяем каждую мышцу
      for (const muscleId in muscleSets) {
        if (muscleSets[muscleId].sets > MAX_SETS_PER_WEEK) {
          return false;
        }
      }
      return true;
    }

    // Проверка на количество упражнений на мышцу в одной тренировке
    function isExercisesPerMuscleValid(workout) {
      const muscleExercises = {};
      
      workout.forEach(exercise => {
        const targetMuscles = exercise.muscles?.filter(m => m.exercise_muscle?.isPrimary) || [];
        
        targetMuscles.forEach(muscle => {
          const muscleId = muscle.idMuscle || muscle.id;
          if (!muscleExercises[muscleId]) {
            muscleExercises[muscleId] = 0;
          }
          muscleExercises[muscleId]++;
          
          // Если больше 3 упражнений на мышцу - плохо
          if (muscleExercises[muscleId] > 3) {
            return false;
          }
        });
      });
      
      return true;
    }

    // Функция извлечения признаков для фитнеса
    function extractFeatures(workout) {
      if (!workout || workout.length === 0) return [0, 0, 0, 0];
      
      // Разнообразие упражнений
      const names = workout.map(ex => ex.exName);
      const diversity = new Set(names).size / workout.length;

      // Проверка порядка (база в начале, изоляция в конце)
      let orderScore = 1.0;
      let foundIsolation = false;
      
      for (let i = 0; i < workout.length; i++) {
        const isBase = workout[i].baseIsolation && workout[i].baseIsolation.toLowerCase().includes('баз');
        
        if (foundIsolation && isBase) {
          // Если после изоляции встретилась база - штраф
          orderScore = 0.3;
          break;
        }
        
        if (!isBase) {
          foundIsolation = true;
        }
      }

      // Проверка на количество упражнений на мышцу
      const muscleCountValid = isExercisesPerMuscleValid(workout) ? 1.0 : 0.3;

      // Процент базовых упражнений (оптимально 20-40%)
      const baseCount = workout.filter(ex => 
        ex.baseIsolation && ex.baseIsolation.toLowerCase().includes('баз')
      ).length;
      const baseRatio = baseCount / workout.length;
      const baseScore = baseRatio >= 0.2 && baseRatio <= 0.4 ? 1.0 : 
                       baseRatio < 0.2 ? 0.5 : 0.7;

      return [diversity, orderScore, muscleCountValid, baseScore];
    }

    function fitness(week) {
      // Проверяем недельный объем
      if (!isWeeklyVolumeValid(week)) {
        return 0; // Штрафуем недели с превышением объема
      }

      const W = { div: 1.0, order: 2.5, muscleCount: 2.0, base: 1.5 };
      let total = 0;
      
      week.forEach(workout => {
        const [d, o, m, b] = extractFeatures(workout);
        total += (d * W.div + o * W.order + m * W.muscleCount + b * W.base);
      });
      
      return total / week.length;
    }

    // --- Генетический алгоритм ---
    let population = Array.from({ length: POPULATION_SIZE }, () => {
      const week = Array.from({ length: TR_WORKOUTS }, () => buildWorkout());
      week.fitness = fitness(week);
      return week;
    });

    for (let gen = 0; gen < GENERATIONS; gen++) {
      population.sort((a, b) => b.fitness - a.fitness);
      const parents = population.slice(0, Math.max(2, Math.floor(POPULATION_SIZE * 0.3)));
      const nextGen = [];

      while (nextGen.length < POPULATION_SIZE) {
        const p1 = parents[Math.floor(Math.random() * parents.length)];
        const p2 = parents[Math.floor(Math.random() * parents.length)];
        
        // Скрещивание
        let child = p1.map((day, idx) => Math.random() > 0.5 ? day : p2[idx]);
        
        // Мутация
        if (Math.random() < MUTATION_RATE) {
          const dayIdx = Math.floor(Math.random() * child.length);
          child[dayIdx] = buildWorkout();
        }
        
        // Дополнительная мутация для улучшения порядка
        if (Math.random() < 0.1) {
          // Сортируем одну тренировку: база в начало, изоляция в конец
          const dayIdx = Math.floor(Math.random() * child.length);
          child[dayIdx] = child[dayIdx].sort((a, b) => {
            const aIsBase = a.baseIsolation && a.baseIsolation.toLowerCase().includes('баз');
            const bIsBase = b.baseIsolation && b.baseIsolation.toLowerCase().includes('баз');
            return aIsBase === bIsBase ? 0 : aIsBase ? -1 : 1;
          });
        }
        
        child.fitness = fitness(child);
        nextGen.push(child);
      }
      population = nextGen;
    }

    // Выбираем лучшую неделю
    const bestWeek = population.sort((a, b) => b.fitness - a.fitness)[0];
    
    // Сортируем каждую тренировку для красоты
    bestWeek.forEach(workout => {
      workout.sort((a, b) => {
        const aIsBase = a.baseIsolation && a.baseIsolation.toLowerCase().includes('баз');
        const bIsBase = b.baseIsolation && b.baseIsolation.toLowerCase().includes('баз');
        return aIsBase === bIsBase ? 0 : aIsBase ? -1 : 1;
      });
    });

    // Подсчитываем итоговый объем для отладки
    const finalVolume = countSetsPerMuscle(bestWeek);
    console.log('Final weekly volume:', finalVolume);

    return res.json({
      bestWeek,
      fitness: bestWeek.fitness,
      volume: finalVolume,
      params: { 
        workouts: TR_WORKOUTS, 
        experience, 
        equipment: userEquipment, 
        restrictions: userRestrictions,
        maxSetsPerWeek: MAX_SETS_PER_WEEK
      }
    });

  } catch (err) {
    console.error('GA error:', err);
    return res.status(500).json({ error: 'Server error' });
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
