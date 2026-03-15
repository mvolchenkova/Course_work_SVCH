require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const sequelize = require('./db');
const { Exercise, Muscle, ExerciseMuscle } = require('./models/models');

const muscleColumns = [
  'передняя\n дельта', 'средняя\nдельта', 'задняя \nдельта', 'трапеции',
  'ромбовидные', 'бицепс', 'трицепс', 'большая \nгрудная', 'средняя \nгрудная',
  'малая\nгрудная', 'предплечье', 'широчайшая', 'прямая\nмышца\nживота',
  'наружные\nкосые\nмышцы', 'внутренние\nкосые \nмышцы', 'поперечные\nмышцы',
  'прямая\nмышца\nбедра', 'квадрицепс', 'бицепс\nбедра', 'большая\nягодичная',
  'средняя\nягодичная', 'малая\nягодичная', 'икроножная', 'камбаловидная'
];

const seedFromCsv = async () => {
  try {
    await sequelize.authenticate();
    console.log('Подключение успешно. Начинаем синхронизацию...');

    const results = [];
    const csvPath = path.join(__dirname, 'exercises.csv');

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', resolve)
        .on('error', reject);
    });

    let added = 0;
    let updated = 0;
    let skipped = 0;

    for (const row of results) {
      const hasDumbbells = !!row['гантели'];
      const hasBarbell   = !!row['штанга'];
      const hasMachines  = !!row['тренажеры'];
      const hasBand       = !!row['резинки'];

      let equipment = 'minimal';
      if (hasMachines)                     equipment = 'gym';
      else if (hasDumbbells && hasBarbell) equipment = 'dumbbells_barbell';
      else if (hasDumbbells)               equipment = 'dumbbells';
      else if (hasBarbell)                 equipment = 'barbell';

      // Актуальные данные из CSV
      const freshData = {
        experience:    row['Опыт']            || '0-6 месяцев',
        baseIsolation: row['База/изоляция']   || 'изоляция',
        type:          row['Тип']             || 'силовое',
        equipment,
        restrictions:  row['Ограничения']     || '',
        technique:     row['Техника выполнения']
                         ? Buffer.from(row['Техника выполнения'])
                         : null,
      };

      const [exercise, created] = await Exercise.findOrCreate({
        where: { exName: row['Упражнение'] },
        defaults: freshData,
      });

      if (created) {
        // Новое упражнение — добавляем мышцы
        added++;
        await syncMuscles(exercise, row);
        continue;
      }

      // Упражнение уже есть — проверяем что изменилось
      const changes = {};

      if (exercise.experience    !== freshData.experience)    changes.experience    = freshData.experience;
      if (exercise.baseIsolation !== freshData.baseIsolation) changes.baseIsolation = freshData.baseIsolation;
      if (exercise.type          !== freshData.type)          changes.type          = freshData.type;
      if (exercise.equipment     !== freshData.equipment)     changes.equipment     = freshData.equipment;
      if (exercise.restrictions  !== freshData.restrictions)  changes.restrictions  = freshData.restrictions;

      // Сравниваем технику (Buffer → строка)
      const existingTechnique = exercise.technique
        ? (Buffer.isBuffer(exercise.technique)
            ? exercise.technique.toString('utf8')
            : String(exercise.technique))
        : '';
      const freshTechnique = row['Техника выполнения'] || '';
      if (existingTechnique !== freshTechnique && freshTechnique) {
        changes.technique = Buffer.from(freshTechnique);
      }

      if (Object.keys(changes).length > 0) {
        await exercise.update(changes);
        console.log(`  ↺ Обновлено "${exercise.exName}": ${Object.keys(changes).join(', ')}`);
        updated++;

        // При изменении мышц — пересинхронизируем связи
        await syncMuscles(exercise, row);
      } else {
        skipped++;
      }
    }

    console.log(`\n✅ Добавлено: ${added} | Обновлено: ${updated} | Без изменений: ${skipped}`);
    process.exit(0);

  } catch (error) {
    console.error('Ошибка импорта:', error);
    process.exit(1);
  }
};

// Синхронизация мышц: удаляем старые связи и создаём актуальные
async function syncMuscles(exercise, row) {
  // Удаляем все старые связи для этого упражнения
  await ExerciseMuscle.destroy({ where: { idExercise: exercise.idExercise } });

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
        idMuscle:   muscle.idMuscle,
        loadValue:  val * 20,
        isPrimary:  val >= 4
      });
    }
  }
}

seedFromCsv();