const { Exercise } = require('../models/models');
const { Op } = require("sequelize");

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
    const TR_WORKOUTS = Number(req.query.amount) || 3;
    const EXERCISES_PER_WORKOUT = 5;
    const POPULATION_SIZE = Number(req.query.pop) || 20;
    const GENERATIONS = Number(req.query.gens) || 10;
    const MUTATION_RATE = Number(req.query.mutRate) || 0.03;
    const possibleReps = [8, 10, 12, 15, 20];

    const experience = req.query.exp ?? '0-6';

    const allExercises = await Exercise.findAll({ raw: true });

    if (!allExercises || allExercises.length < EXERCISES_PER_WORKOUT) {
      return res.status(400).json({ error: 'Недостаточно упражнений в базе' });
    }

    const allIds = allExercises.map(e => e.idExercise);
    const idToExercise = {};
    allExercises.forEach(e => (idToExercise[e.idExercise] = e));

    const expLevels = { "0-6": 0, "6-18": 1, "18+": 2 };
    const userExpIndex = expLevels[experience] ?? 0;

    function sampleIds(n) {
      const arr = allIds.slice();
      for (let i = arr.length - 1; i > arr.length - 1 - n; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.slice(arr.length - n);
    }

    function buildWorkoutFromIds(ids) {
      return ids.map(id => {
        const ex = idToExercise[id];
        return {
          ...ex,
          reps: possibleReps[Math.floor(Math.random() * possibleReps.length)]
        };
      });
    }

    function extractFeatures(workout) {
      if (!workout || workout.length === 0) return [0, 0, 0, 0];

      const numExercises = workout.length / 10;

      const names = workout.map(ex => ex.exName);
      const diversity = new Set(names).size / workout.length;

      const expMatches = workout.filter(ex => {
        const exLevel = typeof ex.experience === 'string'
          ? (expLevels[ex.experience] ?? 0)
          : 0;
        return exLevel <= userExpIndex;
      }).length;
      const expScore = expMatches / workout.length;

      const setsPerGroup = {};
      const setsPerExercise = 4;
      workout.forEach(ex => {
        const groups = (ex.predominantMuscleGroup || 'Other').split(',')
          .map(g => g.trim());
        groups.forEach(g => {
          setsPerGroup[g] = (setsPerGroup[g] || 0) + setsPerExercise;
        });
      });

      function getExpRange(expKey) {
        switch (experience) {
          case '0-6': return { min: 7, max: 9 };
          case '6-18': return { min: 9, max: 12 };
          case '18+': return { min: 12, max: 20 };
          default: return { min: 0, max: Infinity };
        }
      }
      const range = getExpRange(experience);

      let okGroups = 0;
      const totalGroups = Object.keys(setsPerGroup).length;
      Object.values(setsPerGroup).forEach(sets => {
        if (sets >= range.min && sets <= range.max) okGroups++;
      });

      const setsScore = totalGroups > 0 ? okGroups / totalGroups : 0;

      let difficultyMatches = 0;

      workout.forEach(ex => {
        const exLevel = typeof ex.experience === 'string'
          ? (expLevels[ex.experience] ?? 0)
          : 0;

        if (exLevel <= userExpIndex) difficultyMatches++;
      });

      // Доля подходящих упражнений
      const difficultyScore = difficultyMatches / workout.length;


      const baseCount = workout.filter(ex => {
      const t = (ex.type || "").toString().toLowerCase();
      return t === "base";
        }).length;
        const baseScore = baseCount / workout.length;

      // возвращаем все признаки в одном массиве
      return [
        numExercises,
        diversity,
        expScore,
        setsScore,
        difficultyScore,
        baseScore
      ];
    }
    
    function fitness(week) {
      if (!week || week.length === 0) return 0;
      const W = { num: 1.0, div: 1.2, exp: 1.5, sets: 2.0 };
      let total = 0;
      for (let workout of week) {
        const [n, d, e, s] = extractFeatures(workout);
        total += n * W.num + d * W.div + e * W.exp + s * W.sets;
      }


      return total / week.length;
    }

    function createRandomWorkoutFast() {
      const ids = sampleIds(EXERCISES_PER_WORKOUT);
      return buildWorkoutFromIds(ids);
    }

    function createWeekFast() {
      const w = [];
      for (let i = 0; i < TR_WORKOUTS; i++) {
        w.push(createRandomWorkoutFast());
      }
      return w;
    }

    // 👉 INITIAL POPULATION (добавляем fitness!)
    const initialPopulation = [];
    for (let i = 0; i < POPULATION_SIZE; i++) {
      const week = createWeekFast();
      week.fitness = fitness(week);
      initialPopulation.push(week);
    }

    function selectParents(pop) {
      const sorted = pop.slice().sort((a,b) => fitness(b) - fitness(a));
      const count = Math.max(2, Math.floor(sorted.length * 0.3));
      return sorted.slice(0, count);
    }

    function crossover(a, b) {
      const child = [];
      for (let i = 0; i < TR_WORKOUTS; i++) {
        child.push(Math.random() < 0.5 ? a[i] : b[i]);
      }
      return child;
    }

    function mutate(week) {
      return week.map(workout =>
        workout.map(ex => {
          if (Math.random() < MUTATION_RATE) {
            const randIdx = Math.floor(Math.random() * allExercises.length);
            const randEx = allExercises[randIdx];
            return {
              ...randEx,
              reps: possibleReps[Math.floor(Math.random() * possibleReps.length)]
            };
          }
          return { ...ex };
        })
      );
    }

    let population = initialPopulation;
    const generations = [];

    for (let gen = 0; gen < GENERATIONS; gen++) {
      const parents = selectParents(population);
      while (parents.length < 2) parents.push(createWeekFast());

      const children = [];
      while (children.length < POPULATION_SIZE) {
        const p1 = parents[Math.floor(Math.random() * parents.length)];
        const p2 = parents[Math.floor(Math.random() * parents.length)];
        let child = crossover(p1, p2);
        child = mutate(child);
        child.fitness = fitness(child); // 👉 важно!
        children.push(child);
      }

      population = children;

      const best = population.slice().sort((a,b) => a.fitness < b.fitness ? 1 : -1)[0];

      generations.push({
        gen,
        best,
        bestFitness: best.fitness
      });
    }

    // 👉 FINAL POPULATION — тоже добавляем fitness
    const finalPopulation = population.map(w => ({
      ...w,
      fitness: w.fitness ?? fitness(w)
    }));

    const bestWeek = finalPopulation.slice().sort((a,b) => b.fitness - a.fitness)[0];

    return res.json({
      initialPopulation,
      generations,
      finalPopulation,
      bestWeek,
      bestFitness: bestWeek.fitness
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
