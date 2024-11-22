require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const models = require('./models/models');
const router = require('./routes/index')

const PORT = process.env.PORT;

const tplanRouter = require('./routes/tplanRouter');
const favtplanRouter = require('./routes/favtplanRouter');
const userRouter = require('./routes/userRouter') 
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tplans', tplanRouter); 
app.use('/api/users', userRouter); 
app.use('/api/favtplans', favtplanRouter); 
app.use('/api', router);
app.use(express.static('public/data/images'));

const start = async () => {
  try {
      await sequelize.authenticate();
      console.log('Соединение с базой данных успешно!');
      await sequelize.sync(); 
      app.listen(PORT, () => {
          console.log(`Server running at http://localhost:${PORT}`);
      });
  } catch (e) {
      console.error('Ошибка при подключении к базе данных:', e);
  }
};

start();
