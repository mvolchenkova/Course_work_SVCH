// seed.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const sequelize = require('./db');
const { Exercise, Muscle, ExerciseMuscle } = require('./models/models');

const seedFromCsv = async () => {
  try {
    // 1. Проверка подключения и очистка базы
    await sequelize.authenticate();
    await sequelize.query('TRUNCATE TABLE "exercise_muscles", "muscles", "exercises" RESTART IDENTITY CASCADE');
    console.log('Таблицы очищены.');

    const results = [];
    const csvPath = path.join(__dirname, 'exercises.csv');

    // Список всех колонок с мышцами из вашей таблицы (названия должны точно совпадать)
    const muscleColumns = [
      'передняя\n дельта', 'средняя\nдельта', 'задняя \nдельта', 'трапеции',
      'ромбовидные', 'бицепс', 'трицепс', 'большая \nгрудная', 'средняя \nгрудная',
      'малая\nгрудная', 'предплечье', 'широчайшая', 'прямая\nмышца\nживота',
      'наружные\nкосые\nмышцы', 'внутренние\nкосые \nмышцы', 'поперечные\nмышцы',
      'прямая\nмышца\nбедра', 'квадрицепс', 'бицепс\nбедра', 'большая\nягодичная',
      'средняя\nягодичная', 'малая\nягодичная', 'икроножная', 'камбаловидная'
    ];

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const row of results) {
          // Логика оборудования (1 — обязательно, наличие названия — опционально)
          let equipment = 'minimal';
          if (row['тренажеры']) equipment = 'gym';
          else if (row['гантели'] || row['штанга']) equipment = 'home';

          // 2. Создание упражнения
          const exercise = await Exercise.create({
            exName: row['Упражнение'],
            experience: row['Опыт'] || '0-6 месяцев',
            baseIsolation: row['База/изоляция'] || 'изоляция',
            type: row['Тип'] || 'силовое',
            equipment: equipment,
            restrictions: row['Ограничения'] || '',
            technique: Buffer.from(row['Техника выполнения'] || '') // Если оставляете BLOB
          });

          // 3. Создание связей с мышцами
          for (const colName of muscleColumns) {
            const val = parseInt(row[colName]);
            if (!isNaN(val) && val > 0) {
              const cleanMuscleName = colName.replace(/\n/g, ' ').trim();
              
              const [muscle] = await Muscle.findOrCreate({
                where: { muscleName: cleanMuscleName },
                defaults: { muscleGroup: row['Преобладающая мышечная группа'] || 'Общее' }
              });

              await ExerciseMuscle.create({
                idExercise: exercise.idExercise,
                idMuscle: muscle.idMuscle,
                loadValue: val * 20, // 5 -> 100%, 1 -> 20%
                isPrimary: val >= 4  // Считаем целевой, если оценка 4 или 5
              });
            }
          }
        }
        console.log(`Импорт завершен: добавлено ${results.length} упражнений.`);
        process.exit(0);
      });
  } catch (error) {
    console.error('Ошибка импорта:', error);
    process.exit(1);
  }
};

seedFromCsv();