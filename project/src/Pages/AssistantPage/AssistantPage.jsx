import { getRandom } from '../../slices/exerciseSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as tf from "@tensorflow/tfjs";

import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box,
  InputLabel, MenuItem, FormControl, Select
} from '@mui/material';

export default function AssistantPage() {
  const dispatch = useDispatch();
  const { randomExercises } = useSelector(state => state.exercises);    
  const [amount, setAmount] = useState('');
  const [nnScore, setNnScore] = useState(null);

  const handleGetRandom = () => {
    dispatch(getRandom(Number(amount)));
  };

  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  // Загружаем experience из локалки
  const trainingPlan = JSON.parse(localStorage.getItem('trainingPlan')) || {};
  const experience = trainingPlan.experience; 
  const expLevels = { "0-6": 0, "6-18": 1, "18+": 2 };

  // 🔹 Хелперы для признаков
  const extractFeatures = (workout) => {
    if (!workout || workout.length === 0) return [0, 0, 0, 0];

    // 1. Количество упражнений (нормируем /10)
    const numExercises = workout.length / 10;

    // 2. Уникальность упражнений (0-1)
    const names = workout.map(ex => ex.exName);
    const uniqueExerciseCount = new Set(names).size;
    const diversity = uniqueExerciseCount / workout.length; // от 0 до 1

    // 3. Соответствие опыта (доля упражнений, доступных пользователю)
    const userExpIndex = expLevels[experience] ?? 0;
    const expMatches = workout.filter(ex => expLevels[ex.experience] <= userExpIndex).length;
    const expScore = expMatches / workout.length;

    // 4. Соответствие подходов на группу
    const setsPerGroup = {};
    const setsPerExercise = 4;
    workout.forEach(ex => {
      const groups = (ex.predominantMuscleGroup || "Other").split(",").map(g => g.trim());
      groups.forEach(g => {
        if (!setsPerGroup[g]) setsPerGroup[g] = 0;
        setsPerGroup[g] += setsPerExercise;
      });
    });

    // Нормы по опыту
    const getExpRange = (exp) => {
      switch(exp) {
        case "beginner": return { min: 7, max: 9 };
        case "intermediate": return { min: 9, max: 12 };
        case "advanced": return { min: 12, max: 20 };
        default: return { min: 0, max: Infinity };
      }
    };
    const range = getExpRange(experience);

    let okGroups = 0;
    let totalGroups = Object.keys(setsPerGroup).length;
    Object.values(setsPerGroup).forEach(sets => {
      if (sets >= range.min && sets <= range.max) okGroups++;
    });
    const setsScore = totalGroups > 0 ? okGroups / totalGroups : 0;

    return [numExercises, diversity, expScore, setsScore];
  };

  // --- tf.js модель
  const trainAndPredict = async () => {
    if (!randomExercises.length) return;

    // ⚡ Собираем признаки для каждой тренировки
    const features = randomExercises.map(workout => extractFeatures(workout));
    const xs = tf.tensor2d(features);

    // Фейковые "оценки качества" (в реальном приложении тут нужны данные)
    const ys = tf.tensor2d(features.map(f => [
      (0.3*f[0] + 0.2*f[1] + 0.3*f[2] + 0.2*f[3])  // линейная комбинация как пример
    ]));

    // Создаём модель
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 8, inputShape: [4], activation: "relu" }));
    model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
    model.compile({ optimizer: "adam", loss: "meanSquaredError" });

    await model.fit(xs, ys, { epochs: 50 });

    // Предсказываем качество по первой тренировке
    const firstFeatures = extractFeatures(randomExercises[0]);
    const pred = model.predict(tf.tensor2d([firstFeatures]));
    const score = (await pred.data())[0];
    setNnScore(score.toFixed(2));
  };

  return (
    <>
      <div className="displayflex aligncenter justifycenter flexcolumn gap20">
        <p className='fontSize2em marginBottom0'>How many workouts per week do you need?</p>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Amount</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={amount}
              label="Amount"
              onChange={handleChangeAmount}
            >
              {[1,2,3,4,5,6,7].map(num => (
                <MenuItem key={num} value={num}>{num}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <button onClick={handleGetRandom}>GET RANDOM</button>
        <button onClick={trainAndPredict}>🤖 Evaluate NN</button>
      </div>

      {randomExercises.length > 0 && (
        <div className='feature'>
          <p className='title'>RANDOM EXERCISES</p>

          {randomExercises.map((workout, index) => (
            <div key={index} style={{ marginBottom: '2rem' }}>
              <h3>Workout {index + 1} — {workout.length} exercises</h3>
              <TableContainer component={Paper} sx={{ width: '90%' }}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Exercise</TableCell>
                      <TableCell>Reps</TableCell>
                      <TableCell align="center">Muscle Groups</TableCell>
                      <TableCell align="center">Type</TableCell>
                      <TableCell align="center">Difficulty</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {workout.map(ex => (
                      <TableRow key={ex.idExercise}>
                        <TableCell>{ex.exName}</TableCell>
                        <TableCell>4×{ex.reps}</TableCell>
                        <TableCell align="center">{ex.predominantMuscleGroup}</TableCell>
                        <TableCell align="center">{ex.type}</TableCell>
                        <TableCell align="center">
                            {expLevels[experience] >= expLevels[ex.experience] ? "✅ OK" : "⚠️ Hard"}
                        </TableCell>

                        <TableCell>{ex.experience}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))}

          {nnScore && (
            <div style={{ marginTop: "1rem", fontWeight: "bold" }}>
              <p>🤖 Neural Net Score: {nnScore}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
