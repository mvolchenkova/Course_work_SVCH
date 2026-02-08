import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton } from '@mui/material';
import {Link} from 'react-router-dom'
import i18n from '../i18n';

import '../MUIcomp/List.css';

export default function NestedList() {
  // Состояние для каждого списка
  const [openList1, setOpenList1] = React.useState(false);
  const [openList2, setOpenList2] = React.useState(false);
  const [openList3, setOpenList3] = React.useState(false);
  const [openList4, setOpenList4] = React.useState(false);
  const [openList5, setOpenList5] = React.useState(false);

  const handleClick1 = () => setOpenList1(!openList1);
  const handleClick2 = () => setOpenList2(!openList2);
  const handleClick3 = () => setOpenList3(!openList3);
  const handleClick4 = () => setOpenList4(!openList4);
  const handleClick5 = () => setOpenList5(!openList5);

  const t = (key) => i18n.t(key);
  
  return (
    <div className="listDiv">
      {/* Список 1: PLANS */}
      <List sx={listStyle} component="nav">
        <ListItemButton onClick={handleClick1}>
          <ListItemText style={textStyle} disableTypography={true} primary={t('PLANS')} />
          <IconButton edge="end" aria-label="expand" size="small">
            <ExpandMoreIcon 
              sx={{ 
                transform: openList1 ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                color: '#000000', // Если фон голубой, черный будет виден. Если стал белым — поменяй на 'white'
              }} 
            />
          </IconButton>
        </ListItemButton>
        <Collapse in={openList1} timeout="auto" unmountOnExit>
          <Link to="/allPlans">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={t('All_training_plans')} style={textStyle} disableTypography={true} />
            </ListItemButton>
          </Link>
          <Link to="/favPlans">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={t('Favourite_plans')} style={textStyle} disableTypography={true} />
            </ListItemButton>
          </Link>
        </Collapse>
      </List>

      {/* Список 2: NUTRITION */}
      <List sx={listStyle} component="nav">
        <ListItemButton onClick={handleClick2}>
          <ListItemText style={textStyle} disableTypography={true} primary={t('NUTRITION')} />
          <IconButton edge="end" aria-label="expand" size="small">
            <ExpandMoreIcon 
              sx={{ 
                transform: openList1 ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                color: '#000000', // Если фон голубой, черный будет виден. Если стал белым — поменяй на 'white'
              }} 
            />
          </IconButton>
        </ListItemButton>
        <Collapse in={openList2} timeout="auto" unmountOnExit>
          <Link to="/allNutrition">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={t('All_recipes')} style={textStyle} disableTypography={true} />
            </ListItemButton>
          </Link>
          <Link to="/favRecipes">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={t('Favouriterecipes')} style={textStyle} disableTypography={true} />
            </ListItemButton>
          </Link>
           <Link to="/fatsecret">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={t('Calories_calc')} style={textStyle} disableTypography={true} />
            </ListItemButton>
          </Link>
        </Collapse>
      </List>

      {/* Список 3: ACCOUNT */}
      <List sx={listStyle} component="nav">
        <ListItemButton onClick={handleClick3}>
          <ListItemText style={textStyle} disableTypography={true} primary={t('ACCOUNT')} />
          <IconButton edge="end" aria-label="expand" size="small">
            <ExpandMoreIcon 
              sx={{ 
                transform: openList1 ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                color: '#000000', // Если фон голубой, черный будет виден. Если стал белым — поменяй на 'white'
              }} 
            />
          </IconButton>
        </ListItemButton>
        <Collapse in={openList3} timeout="auto" unmountOnExit>
          <Link to="/account">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={t('Account_info')} style={textStyle} disableTypography={true} />
            </ListItemButton>
          </Link>
          <Link to="/achievements">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={t('Achievements')} style={textStyle} disableTypography={true} />
            </ListItemButton>
          </Link>
        </Collapse>
      </List>

      {/* Список 4: RESOURCES */}
      <List sx={listStyle} component="nav">
        <ListItemButton onClick={handleClick4}>
          <ListItemText style={textStyle} disableTypography={true} primary={t('RESOURCES')} />
          <IconButton edge="end" aria-label="expand" size="small">
            <ExpandMoreIcon 
              sx={{ 
                transform: openList1 ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                color: '#000000', // Если фон голубой, черный будет виден. Если стал белым — поменяй на 'white'
              }} 
            />
          </IconButton>
        </ListItemButton>
        <Collapse in={openList4} timeout="auto" unmountOnExit>
          <Link to="/articles">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={t('Articles')} style={textStyle} disableTypography={true} />
            </ListItemButton>
          </Link>
          <Link to="/advices">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={t('Advices')} style={textStyle} disableTypography={true} />
            </ListItemButton>
          </Link>
          <Link to="/technique">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={t('Exercise_technique')} style={textStyle} disableTypography={true} />
            </ListItemButton>
          </Link>
        </Collapse>
      </List>

      {/* Список 5: CALCULATORS */}
      <List sx={listStyle} component="nav">
        <ListItemButton onClick={handleClick5}>
          <ListItemText style={textStyle} disableTypography={true} primary={t('CALCULATORS')} />
          <IconButton edge="end" aria-label="expand" size="small">
            <ExpandMoreIcon 
              sx={{ 
                transform: openList1 ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                color: '#000000', // Если фон голубой, черный будет виден. Если стал белым — поменяй на 'white'
              }} 
            />
          </IconButton>
        </ListItemButton>
        <Collapse in={openList5} timeout="auto" unmountOnExit>
          <Link to="/calories">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={t('Basal_metabolic_rate')} style={textStyle} disableTypography={true} />
            </ListItemButton>
          </Link>
          <Link to="/bodyMassIndex">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={t('Body_mass_index')} style={textStyle} disableTypography={true} />
            </ListItemButton>
          </Link>
          <Link to="/waterCalc">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={t('Water_consumption_rate')} style={textStyle} disableTypography={true} />
            </ListItemButton>
          </Link>
        </Collapse>
      </List>
    </div>
  );
}

// Вынес стили для чистоты кода
const listStyle = { width: '100%', maxWidth: 360, bgcolor: 'rgb(0, 200, 220)', borderRadius: '30px', marginTop: '10px', margin: '10px 0' };
const textStyle = { fontFamily: 'smalle', margin: 0 };