// pages/AssistantPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandom } from '../../slices/exerciseSlice';
import WeekBlock from '../../Components/WeekBlock/WeekBlock';
import {
  Box, FormControl, InputLabel, MenuItem, Select, Button,
  Accordion, AccordionSummary, AccordionDetails,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import i18n from '../../i18n';


export default function AssistantPage() {
  const dispatch = useDispatch();
  const t = (key) => i18n.t(key);
  const [amount, setAmount] = useState(3);
  const { ga = {}, loading, error } = useSelector(state => state.exercises);

  const trainingPlan = JSON.parse(localStorage.getItem('trainingPlan')) || {};
  const experience = trainingPlan.experience ?? '0-6';

  const [planData, setPlanData] = useState({
          experience: '',
          diseases: '',
          workoutsPerWeek: '',
          workoutsPerGroup: '',
          periodWeeks: '',
          preferences: '',
          equipment: '',
          duration: '',
          sex: '',
          cyclePhase: ''
      });

      useEffect(() => {
        const savedPlan = localStorage.getItem('trainingPlan');
        if (savedPlan) {
            setPlanData(JSON.parse(savedPlan));
        }
    }, []);
  const onGenerate = () => {
    dispatch(getRandom({ amount, exp: experience }));
  };

  // нормализует неделю, убирая лишние поля типа fitness
  const normalizeWeek = (week) => {
    if (Array.isArray(week)) return week;
    return Object.values(week).filter(v => Array.isArray(v));
  };

  const renderWeeks = (weeks = [], titlePrefix = "Week") => (
    weeks.map((week, i) => (
      <Accordion key={i} sx={{ mb: 1 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            {titlePrefix} {i + 1} — Score: {(week.fitness ?? 0).toFixed(3)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <WeekBlock week={normalizeWeek(week)} title={`${titlePrefix} ${i + 1}`} />
        </AccordionDetails>
      </Accordion>
    ))
  );

  const handleCreatePlan = () => {
        localStorage.setItem('trainingPlan', JSON.stringify(planData));
        alert(t('alert_plan_saved'));
    };
    const handlePlanInputChange = (e) => {
        const { name, value } = e.target;
        setPlanData(prev => ({ ...prev, [name]: value }));
    };

  return (
    <div style={{ padding: 20 }}>
<div className="planForm">
                    <h2 className='modal-title'>{t('title_preferences')}</h2>
                    <label>
                        {t('plan_experience')}:
                        <select className="select marginLeft5" name="experience" value={planData.experience} onChange={handlePlanInputChange}>
                            <option value="">{t('opt_select')}</option>
                            <option value="0-6">{t('exp_junior')}</option>
                            <option value="6-18">{t('exp_middle')}</option>
                            <option value="18+">{t('exp_senior')}</option>
                        </select>
                    </label>
                    <label>
                        {t('plan_diseases')}:
                        <input type="text" className="select marginLeft5" name="diseases" value={planData.diseases} onChange={handlePlanInputChange} />
                    </label>
                    <label>
                        {t('plan_per_week')}:
                        <input type="number" className="select marginLeft5" name="workoutsPerWeek" value={planData.workoutsPerWeek} onChange={handlePlanInputChange} />
                    </label>
                    <label>
                        {t('plan_per_group')}:
                        <input type="number" className="select marginLeft5" name="workoutsPerGroup" value={planData.workoutsPerGroup} onChange={handlePlanInputChange} />
                    </label>
                    <label>
                        {t('plan_period')}:
                        <input type="number" className="select marginLeft5" name="periodWeeks" value={planData.periodWeeks} onChange={handlePlanInputChange} />
                    </label>
                    <label>
                        {t('plan_pref_type')}:
                        <select className="select marginLeft5" name="preferences" value={planData.preferences} onChange={handlePlanInputChange}>
                            <option value="">{t('opt_select')}</option>
                            <option value="strength">{t('pref_strength')}</option>
                            <option value="cardio">{t('pref_cardio')}</option>
                            <option value="mixed">{t('pref_mixed')}</option>
                        </select>
                    </label>
                    <label>
                        {t('plan_equipment')}:
                        <select className="select marginLeft5" name="equipment" value={planData.equipment} onChange={handlePlanInputChange}>
                            <option value="">{t('opt_select')}</option>
                            <option value="gym">{t('eq_gym')}</option>
                            <option value="dumbbells_home">{t('eq_dumbbells')}</option>
                            <option value="nothing_home">{t('eq_nothing')}</option>
                            <option value="pullup_bars">{t('eq_bars')}</option>
                        </select>
                    </label>
                    <label>
                        {t('plan_sex')}:
                        <select className="select marginLeft5" name="sex" value={planData.sex} onChange={handlePlanInputChange}>
                            <option value="">{t('opt_select')}</option>
                            <option value="male">{t('sex_male')}</option>
                            <option value="female">{t('sex_female')}</option>
                        </select>
                    </label>
                    {planData.sex === 'female' && (
                        <label>
                            {t('plan_cycle')}:
                            <select className="select marginLeft5" name="cyclePhase" value={planData.cyclePhase} onChange={handlePlanInputChange}>
                                <option value="">{t('opt_select')}</option>
                                <option value="menstruation">{t('cyc_menstruation')}</option>
                                <option value="ovulation">{t('cyc_ovulation')}</option>
                                <option value="luteal">{t('cyc_luteal')}</option>
                            </select>
                        </label>
                    )}
                    <button onClick={handleCreatePlan}>{t('btn_save_plan')}</button>
                </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel>Workouts / week</InputLabel>
            <Select
              value={amount}
              label="Workouts / week"
              onChange={(e) => setAmount(Number(e.target.value))}
            >
              {[1,2,3,4,5,6,7].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" onClick={onGenerate} disabled={loading}>
          Generate (20 weeks)
        </Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Initial population */}
      {ga.initialPopulation?.length > 0 && (
        <>
          <h2>Initial population (20 weeks)</h2>
          {renderWeeks(ga.initialPopulation, "Initial week")}
        </>
      )}

      {/* Generations */}
      {ga.generations?.length > 0 && (
        <>
          <h2>Evolution steps</h2>
          {ga.generations.map((g) => (
            <Accordion key={g.gen} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  Generation {g.gen} — Best fitness: {g.bestFitness.toFixed(3)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <WeekBlock week={normalizeWeek(g.best)} title={`Best of generation ${g.gen}`} />
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}

      {/* Final population */}
      {ga.finalPopulation?.length > 0 && (
        <>
          <h2>Final population (20 weeks)</h2>
          {renderWeeks(ga.finalPopulation, "Final week")}
        </>
      )}

      {/* Best week */}
      {ga.bestWeek && (
        <>
          <h2>Your optimized training plan</h2>
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                Best week — Score: {ga.bestFitness?.toFixed(3)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <WeekBlock week={normalizeWeek(ga.bestWeek)} title="Best week" />
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </div>
  );
}
