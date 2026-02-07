// pages/AssistantPage.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandom } from '../../slices/exerciseSlice';
import WeekBlock from '../../Components/WeekBlock/WeekBlock';
import {
  Box, FormControl, InputLabel, MenuItem, Select, Button,
  Accordion, AccordionSummary, AccordionDetails,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AssistantPage() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(3);
  const { ga = {}, loading, error } = useSelector(state => state.exercises);

  const trainingPlan = JSON.parse(localStorage.getItem('trainingPlan')) || {};
  const experience = trainingPlan.experience ?? '0-6';

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

  return (
    <div style={{ padding: 20 }}>
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
