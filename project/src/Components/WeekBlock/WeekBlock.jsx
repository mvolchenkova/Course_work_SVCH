import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';

export default function WeekBlock({ week, title }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {title && <h3>{title}</h3>}
      {week.map((workout, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <h4>Day {i + 1} — {workout.length} exercises</h4>
          <TableContainer component={Paper} sx={{ width: '90%' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Exercise</TableCell>
                  <TableCell>Reps</TableCell>
                  <TableCell>Muscle Groups</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Experience</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workout.map(ex => (
                  <TableRow key={ex.idExercise}>
                    <TableCell>{ex.exName}</TableCell>
                    <TableCell>4×{ex.reps}</TableCell>
                    <TableCell>{ex.predominantMuscleGroup}</TableCell>
                    <TableCell>{ex.type}</TableCell>
                    <TableCell>{ex.experience}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
}
