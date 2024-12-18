import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton } from '@mui/material';
import {Link} from 'react-router-dom'

import '../MUIcomp/List.css';

export default function NestedList() {
  // Состояние для каждого списка
  const [openList1, setOpenList1] = React.useState(false);
  const [openList2, setOpenList2] = React.useState(false);
  const [openList3, setOpenList3] = React.useState(false);
  const [openList4, setOpenList4] = React.useState(false);

  const handleClick1 = () => setOpenList1(!openList1);
  const handleClick2 = () => setOpenList2(!openList2);
  const handleClick3 = () => setOpenList3(!openList3);
  const handleClick4 = () => setOpenList4(!openList4);

  return (
    <div className="listDiv">
      {/* Первый список */}
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'rgb(0, 200, 220)', borderRadius: '30px',
       margin: 0}}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick1}>
          <ListItemText 
            style={{ fontFamily: 'Pixelify Sans', margin: 0 }}
            disableTypography={true}
            primary="PLANS" 
          />
          <IconButton edge="end" aria-label="expand" size="small">
            <ExpandMoreIcon 
              sx={{ 
                transform: openList1 ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                color: '#000000', // Цвет стрелки
              }} 
            />
          </IconButton>
        </ListItemButton>
        <Collapse in={openList1} timeout="auto" unmountOnExit>
          <Link to="/allPlans">
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText 
                primary="All training plans" 
                style={{ fontFamily: 'Pixelify Sans' }}
                disableTypography={true}
              />
            </ListItemButton>
          </List>
          </Link>
          <Link to="/favPlans">
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText 
                  primary="Favourite plans" 
                  style={{ fontFamily: 'Pixelify Sans' }}
                  disableTypography={true}
                />
              </ListItemButton>
            </List>
          </Link>
          
        </Collapse>
      </List>

      {/* Второй список */}
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'rgb(0, 200, 220)', borderRadius: '30px', marginTop: '10px',
        margin: 0 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick2}>
          <ListItemText 
            style={{ fontFamily: 'Pixelify Sans', margin: 0 }}
            disableTypography={true}
            primary="NUTRITION" 
          />
          <IconButton edge="end" aria-label="expand" size="small">
            <ExpandMoreIcon 
              sx={{ 
                transform: openList2 ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                color: '#000000', // Цвет стрелки
              }} 
            />
          </IconButton>
        </ListItemButton>
        <Collapse in={openList2} timeout="auto" unmountOnExit>
        <Link to="/allNutrition">
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText 
                primary="All recipes" 
                style={{ fontFamily: 'Pixelify Sans' }}
                disableTypography={true}
              />
            </ListItemButton>
          </List>
          </Link>
          <Link to="/favRecipes">
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText 
                  primary="Favourite recipes" 
                  style={{ fontFamily: 'Pixelify Sans' }}
                  disableTypography={true}
                />
              </ListItemButton>
            </List>
          </Link>
          
        </Collapse>
      </List>

      {/* Третий список */}
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'rgb(0, 200, 220)', borderRadius: '30px', marginTop: '10px',
         margin: 0 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        
          <ListItemButton onClick={handleClick3}>
            <ListItemText 
              style={{ fontFamily: 'Pixelify Sans', margin: 0 }}
              disableTypography={true}
              primary="ACCOUNT" 
            />
            <IconButton edge="end" aria-label="expand" size="small">
              <ExpandMoreIcon 
                sx={{ 
                  transform: openList3 ? 'rotate(180deg)' : 'rotate(0deg)', 
                  transition: 'transform 0.2s ease',
                  color: '#000000', // Цвет стрелки
                }} 
              />
            </IconButton>
          </ListItemButton>
        
        <Collapse in={openList3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <Link to="/account">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText 
                primary="Account info" 
                style={{ fontFamily: 'Pixelify Sans' }}
                disableTypography={true}
              />
            </ListItemButton>
            </Link>
          </List>
          
        </Collapse>
      </List>

      {/* Четвертый список */}
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'rgb(0, 200, 220)', borderRadius: '30px', marginTop: '10px',
         margin: 0 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick4}>
          <ListItemText 
            style={{ fontFamily: 'Pixelify Sans', margin: 0 }}
            disableTypography={true}
            primary="RESOURCES" 
          />
          <IconButton edge="end" aria-label="expand" size="small">
            <ExpandMoreIcon 
              sx={{ 
                transform: openList4 ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s ease',
                color: '#000000', // Цвет стрелки
              }} 
            />
          </IconButton>
        </ListItemButton>
        <Collapse in={openList4} timeout="auto" unmountOnExit>
          
          <List component="div" disablePadding>
            <Link to="/articles">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText 
                  primary="Articles" 
                  style={{ fontFamily: 'Pixelify Sans' }}
                  disableTypography={true}
                />
              </ListItemButton>
            </Link>
            
          </List>
          <Link to="/advices">
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText 
                  primary="Advices" 
                  style={{ fontFamily: 'Pixelify Sans' }}
                  disableTypography={true}
                />
              </ListItemButton>
          </List>
          </Link>
          
        </Collapse>
      </List>
    </div>
  );
}