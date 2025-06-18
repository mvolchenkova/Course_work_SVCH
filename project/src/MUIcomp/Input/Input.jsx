import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({ label, value, onChange }) {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="on"
    >
      <TextField 
        id="outlined-basic" 
        label={label}          
        variant="outlined" 
        value={value}         
        onChange={onChange}   
      />
    </Box>
  );
}