import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createExercise } from '../../slices/exerciseSlice';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
  ListItemText
} from '@mui/material';

const muscleGroups = [
  { name: 'frontDelta', label: 'Передняя дельта' },
  { name: 'middleDelta', label: 'Средняя дельта' },
  { name: 'backDelta', label: 'Задняя дельта' },
  { name: 'trapezoids', label: 'Трапеции' },
  { name: 'diamondshaped', label: 'Ромбовидные' },
  { name: 'biceps', label: 'Бицепс' },
  { name: 'triceps', label: 'Трицепс' },
  { name: 'bigChest', label: 'Большая грудная' },
  { name: 'middleChest', label: 'Средняя грудная' },
  { name: 'smallChest', label: 'Малая грудная' },
  { name: 'forearm', label: 'Предплечье' },
  { name: 'latissimus', label: 'Широчайшие' },
  { name: 'straightBelly', label: 'Прямая живота' },
  { name: 'externalOblique', label: 'Наружная косая' },
  { name: 'internalOblique', label: 'Внутренняя косая' },
  { name: 'transverse', label: 'Поперечная' },
  { name: 'straightHips', label: 'Прямая бедра' },
  { name: 'quadriceps', label: 'Квадрицепс' },
  { name: 'bicepsHips', label: 'Бицепс бедра' },
  { name: 'bigGluteal', label: 'Большая ягодичная' },
  { name: 'middleGluteal', label: 'Средняя ягодичная' },
  { name: 'smallGluteal', label: 'Малая ягодичная' },
  { name: 'gastrocnemius', label: 'Икроножная' },
  { name: 'soleus', label: 'Камбаловидная' }
];

const initialMuscleStates = {};
muscleGroups.forEach(group => {
  initialMuscleStates[group.name] = { selected: false, rating: 1 };
});

const AddExerciseModal = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    exName: '',
    experience: '',
    predominantMuscleGroup: [],
    baseIsolation: '',
    type: '',
    restrictions: '',
    equipment: '',
    ...initialMuscleStates
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'predominantMuscleGroup') {
      // MUI Select multiple sometimes returns string, преобразуем в массив
      setFormData(prev => ({
        ...prev,
        [name]: typeof value === 'string' ? value.split(',') : value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleMuscleToggle = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        selected: !prev[name].selected
      }
    }));
  };

  const handleMuscleRatingChange = (name, rating) => {
    setFormData(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        rating
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Валидация обязательных полей
    if (!formData.exName.trim()) {
      alert('Введите название упражнения');
      return;
    }
    if (!formData.experience) {
      alert('Выберите опыт');
      return;
    }
    if (!formData.predominantMuscleGroup.length) {
      alert('Выберите хотя бы одну преобладающую группу мышц');
      return;
    }
    if (!formData.baseIsolation) {
      alert('Выберите базовое или изолированное упражнение');
      return;
    }
    if (!formData.restrictions.trim()) {
      alert('Введите ограничения');
      return;
    }
    if (!formData.equipment.trim()) {
      alert('Введите оборудование');
      return;
    }


    const selectedMusclesWithRatings = {};
    muscleGroups.forEach(group => {
      const muscle = formData[group.name];
      if (muscle.selected) {
        selectedMusclesWithRatings[group.name] = muscle.rating;
      }
    });

    const predominantMuscleGroupStr = Array.isArray(formData.predominantMuscleGroup)
    ? formData.predominantMuscleGroup.join(',')
    : formData.predominantMuscleGroup;

    const payload = {
      exName: formData.exName,
      experience: formData.experience,
      predominantMuscleGroup: predominantMuscleGroupStr,
      baseIsolation: formData.baseIsolation,
      type: formData.type,
      restrictions: formData.restrictions,
      equipment: formData.equipment,
      muscles: selectedMusclesWithRatings
    };

    dispatch(createExercise(payload));
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>Добавить упражнение</Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
          fullWidth
          label="Название упражнения"
          name="exName"
          value={formData.exName}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Опыт</InputLabel>
          <Select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            label="Опыт"
          >
            <MenuItem value="0-6">0–6 месяцев</MenuItem>
            <MenuItem value="6-18">6–18 месяцев</MenuItem>
            <MenuItem value="18+">Более 18 месяцев</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Преобладающие группы мышц</InputLabel>
          <Select
            multiple
            name="predominantMuscleGroup"
            value={formData.predominantMuscleGroup}
            onChange={handleChange}
            renderValue={(selected) => selected.map(
              name => muscleGroups.find(m => m.name === name)?.label || name
            ).join(', ')}
          >
            {muscleGroups.map(group => (
              <MenuItem key={group.name} value={group.name}>
                <Checkbox checked={formData.predominantMuscleGroup.indexOf(group.name) > -1} />
                <ListItemText primary={group.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>База/Изоляция</InputLabel>
          <Select
            name="baseIsolation"
            value={formData.baseIsolation}
            onChange={handleChange}
            label="База/Изоляция"
          >
            <MenuItem value="base">Базовое</MenuItem>
            <MenuItem value="isolation">Изолированное</MenuItem>
            <MenuItem value="form">Формирующее</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth required sx={{ mb: 2 }}>
          <InputLabel>Тип</InputLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            label="Тип"
          >
            <MenuItem value="traction">Тяговое</MenuItem>
            <MenuItem value="spreading">Разводящее</MenuItem>
            <MenuItem value="press">Жимовое</MenuItem>
            <MenuItem value="push">Толчковое</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Ограничения"
          name="restrictions"
          value={formData.restrictions}
          onChange={handleChange}
          multiline
          rows={2}
          required
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Оборудование"
          name="equipment"
          value={formData.equipment}
          onChange={handleChange}
          multiline
          rows={2}
          required
          sx={{ mb: 3 }}
        />
        </div>
        <div>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Задействованные группы мышц:
        </Typography>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {muscleGroups.map(group => {
            const muscle = formData[group.name];
            return (
              <div key={group.name} style={{ width: '45%' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={muscle.selected}
                      onChange={() => handleMuscleToggle(group.name)}
                    />
                  }
                  label={group.label}
                />
                {muscle.selected && (
                  <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                    <InputLabel>Оценка</InputLabel>
                    <Select
                      value={muscle.rating}
                      label="Оценка"
                      onChange={(e) =>
                        handleMuscleRatingChange(group.name, Number(e.target.value))
                      }
                    >
                      {[1, 2, 3, 4, 5].map(val => (
                        <MenuItem key={val} value={val}>{val}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </div>
            );
          })}
        </div>

        
        </div>


        
      </form>
      <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
        >
          Добавить упражнение
        </Button>
    </Paper>
  );
};

export default AddExerciseModal;
