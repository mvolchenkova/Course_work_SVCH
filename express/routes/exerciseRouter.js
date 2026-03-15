const Router = require('express');
const router = new Router();
const exerciseController = require('../controllers/exerciseController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Настройка хранилища для видео
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/videos';
        // Создаем папку, если она не существует
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Генерируем уникальное имя файла: timestamp + расширение
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Теперь ошибка пропадет, так как переменная upload определена выше
router.post('/', upload.single('video'), exerciseController.create);

// router.post('/', exerciseController.create);
router.get('/', exerciseController.getAll);
router.get('/random', exerciseController.getRandomExercises)
router.put('/update/:id', upload.single('video'), exerciseController.update);
module.exports = router;
