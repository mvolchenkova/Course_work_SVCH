require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const models = require('./models/models');
const router = require('./routes/index');
const fileUpload = require('express-fileupload');
const path = require('path')
const fs = require('fs');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', 'static', 'diplomas'));
    },
    filename: (req, file, cb) => {
        const fileName = uuid.v4() + ".pdf";
        cb(null, fileName);
    }
});

const upload = multer({ storage });


const PORT = process.env.PORT;

const tplanRouter = require('./routes/tplanRouter');
const favtplanRouter = require('./routes/favtplanRouter');
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');
const recipeRouter = require('./routes/recipeRouter');
const articleRouter = require('./routes/acrticleRouter');
const questionRouter = require('./routes/questionRouter')
const adviceRouter = require('./routes/adviceRouter')
const chatRouter = require('./routes/chatRouter')
const exerciseRouter = require('./routes/exerciseRouter')
const calorieRouter = require('./routes/calorieRouter')

const app = express();
// app.use(cors());

// Разрешаем CORS для фронтенда
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload())
app.use('/api/tplans', tplanRouter); 
app.use('/api/users', userRouter); 
app.use('/api/favtplans', favtplanRouter); 
app.use('/api/tasks', taskRouter)
app.use('/api/recipes', recipeRouter)
app.use('/api/articles', articleRouter)
app.use('/api/questions', questionRouter)
app.use('/api/advices', adviceRouter)
app.use('/api/chat', chatRouter )
app.use('/api/exercises', exerciseRouter)
app.use('/api/calories', calorieRouter)


app.use('/api', router);
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


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
app.get('/api/images', (req, res) => {
    const imageDir = path.join(__dirname, '..', 'project', 'public', 'data', 'images'); // Adjust this path as necessary

    fs.readdir(imageDir, (err, files) => {
        if (err) {
            console.error("Error reading image directory:", err);
            return res.status(500).json({ message: 'Error reading images' });
        }

        const trImages = files.filter(file => file.startsWith('tr')); // Filter images starting with "tr"
        const imageUrls = trImages.map(file => `/data/images/${file}`); // Create URLs for images
        res.json(imageUrls); // Return the URLs as a JSON response
    });
});

app.get('/api/recipeImages', (req, res) => {
    const imageDir = path.join(__dirname, '..', 'project', 'public', 'data', 'images', 'recipes'); // Adjust this path as necessary

    fs.readdir(imageDir, (err, files) => {
        if (err) {
            console.error("Error reading image directory:", err);
            return res.status(500).json({ message: 'Error reading images' });
        }

        const imageUrls = files.map(file => `/data/images/recipes/${file}`); // Create URLs for images
        res.json(imageUrls); // Return the URLs as a JSON response
    });
});





start();
