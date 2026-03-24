import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandom } from '../../slices/exerciseSlice';
import WeekBlock from '../../Components/WeekBlock/WeekBlock';
import {
  Box, FormControl, InputLabel, MenuItem, Select, Button,
  Accordion, AccordionSummary, AccordionDetails,
  Typography, Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import i18n from '../../i18n';
import { HEALTH_RESTRICTIONS } from '../../utils/constants';
import '../AssistantPage/AssistantPage.css'

export default function AssistantPage() {
  const dispatch = useDispatch();
  const t = (key) => i18n.t(key);
  
  const { ga: gaRaw, status, error } = useSelector(state => state.exercises);
  const ga = gaRaw ?? {};
  const loading = status === 'loading';
  const [planData, setPlanData] = useState({
    experience: '0-6',
    diseases: '',
    workoutsPerWeek: 3,
    equipment: 'gym'
  });

  useEffect(() => {
    const savedPlan = localStorage.getItem('trainingPlan');
    if (savedPlan) {
      const parsed = JSON.parse(savedPlan);
      // Оставляем только нужные поля из сохраненных данных
      setPlanData({
        experience: parsed.experience || '0-6',
        diseases: parsed.diseases || '',
        workoutsPerWeek: parsed.workoutsPerWeek || 3,
        equipment: parsed.equipment || 'gym'
      });
    }
  }, []);

  const handlePlanInputChange = (e) => {
    const { name, value } = e.target;
    setPlanData(prev => ({ ...prev, [name]: value }));
  };

  const onGenerate = () => {
    // Сохраняем перед генерацией
    localStorage.setItem('trainingPlan', JSON.stringify(planData));
    
    // Отправляем только 4 ключевых параметра
    dispatch(getRandom({ 
      amount: planData.workoutsPerWeek, 
      exp: planData.experience,
      restrictions: planData.diseases, 
      equipment: planData.equipment
    }));
  };

  const normalizeWeek = (week) => {
    if (!week) return [];
    if (Array.isArray(week)) return week;
    return Object.values(week).filter(v => Array.isArray(v));
  };

return (
    <div className="assistantMainDiv"> {/* Общая обертка */}
      <div className="assistantContainer"> {/* Карточка */}
        
        <div className="assistantHeader">
          <h2>{t('title_preferences')}</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
            Настройте параметры для создания оптимального плана
          </p>
        </div>

        <div className="paramsGrid"> {/* Сетка 2х2 */}
          {/* ОПЫТ */}
          <FormControl fullWidth>
            <InputLabel>{t('plan_experience')}</InputLabel>
            <Select name="experience" value={planData.experience} label={t('plan_experience')} onChange={handlePlanInputChange}>
              <MenuItem value="0-6">{t('exp_junior')}</MenuItem>
              <MenuItem value="6-18">{t('exp_middle')}</MenuItem>
              <MenuItem value="18+">{t('exp_senior')}</MenuItem>
            </Select>
          </FormControl>

          {/* ОГРАНИЧЕНИЯ */}
          <FormControl fullWidth>
            <InputLabel>{t('plan_diseases')}</InputLabel>
            <Select name="diseases" value={planData.diseases} label={t('plan_diseases')} onChange={handlePlanInputChange}>
              <MenuItem value=""><em>{t('no_restrictions')}</em></MenuItem>
              {HEALTH_RESTRICTIONS.map(item => (
                <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* ОБОРУДОВАНИЕ */}
          <FormControl fullWidth>
            <InputLabel>{t('plan_equipment')}</InputLabel>
            <Select name="equipment" value={planData.equipment} label={t('plan_equipment')} onChange={handlePlanInputChange}>
              <MenuItem value="gym">{t('eq_gym')}</MenuItem>
              <MenuItem value="dumbbells_barbell">{t('eq_dumbbells_barbell')}</MenuItem>
              <MenuItem value="dumbbells">{t('eq_dumbbells')}</MenuItem>
              <MenuItem value="barbell">{t('eq_barbell')}</MenuItem>
              <MenuItem value="fitnessband">{t('eq_band')}</MenuItem>
              <MenuItem value="minimal">{t('eq_nothing')}</MenuItem>
            </Select>
          </FormControl>

          {/* КОЛИЧЕСТВО ТРЕНИРОВОК */}
          <FormControl fullWidth>
            <InputLabel>{t('plan_per_week')}</InputLabel>
            <Select name="workoutsPerWeek" value={planData.workoutsPerWeek} label={t('plan_per_week')} onChange={(e) => setPlanData(prev => ({...prev, workoutsPerWeek: Number(e.target.value)}))}>
              {[2, 3, 4, 5].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
            </Select>
          </FormControl>
        </div>

        <Button 
          variant="contained" 
          className="generateBtn" 
          fullWidth 
          onClick={onGenerate} 
          disabled={loading}
        >
          {loading ? t('loading') : t('btn_generate_plan')}
        </Button>

        {error && <Alert severity="error" sx={{ mt: 2, borderRadius: '10px' }}>{error}</Alert>}

        {/* ОТОБРАЖЕНИЕ РЕЗУЛЬТАТА */}
        {ga.bestWeek && (
          <Box className="planResultSection">
            <Typography variant="h5" sx={{ fontFamily: 'artika', mb: 2 }}>
              {t('your_optimized_plan')}
            </Typography>
            <WeekBlock week={normalizeWeek(ga.bestWeek)} title={t('single_week_plan')} />
            <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'grey.500' }}>
              Fitness Score: {ga.bestFitness?.toFixed(3)}
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
}