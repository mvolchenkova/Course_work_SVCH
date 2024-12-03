require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const models = require('./models/models');
const router = require('./routes/index');
const fileUpload = require('express-fileupload');
const path = require('path')

const PORT = process.env.PORT;

const tplanRouter = require('./routes/tplanRouter');
const favtplanRouter = require('./routes/favtplanRouter');
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');
const recipeRouter = require('./routes/recipeRouter');
const articleRouter = require('./routes/acrticleRouter');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api/tplans', tplanRouter); 
app.use('/api/users', userRouter); 
app.use('/api/favtplans', favtplanRouter); 
app.use('/api/tasks', taskRouter)
app.use('/api/recipes', recipeRouter)
app.use('/api/articles', articleRouter)
app.use('/api', router);


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
