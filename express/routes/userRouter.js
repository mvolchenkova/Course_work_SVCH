const Router = require('express');
const router = new Router();
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController');

// Настройка хранилища
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/avatars');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `user_${req.body.userId}_${Date.now()}${ext}`);
    }
});

const upload = multer({ storage });

// Роут. Обратите внимание: метод контроллера передается вторым аргументом
router.post('/upload-avatar', upload.single('avatar'), userController.uploadAvatar);

router.post('/', userController.create)
router.get('/', userController.getAll)
router.get('/sorted', userController.getAllSorted);
router.get('/filtered', userController.getAllFiltered);
router.get('/search', userController.search);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:userId', (req, res, next) => {
    console.log(`Received DELETE request for userId: ${req.params.userId}`);
    next();
}, userController.delete);
router.get('/exists/:id', userController.exists);
router.post('/check', userController.getChecked);
router.post('/logout', userController.logoutUser);
router.put('/becomeCoach/:id', userController.becomeCoach)
router.patch('/:id/block', userController.block)
router.put('/:id/addFavoritePlan', userController.addFavoritePlan)
router.put('/:id/addFavoriteRecipe', userController.addFavoriteRecipe)
router.get('/:userId/notes', userController.getUserNotes);
router.post('/:userId/notes', userController.addUserNote);
router.delete('/notes/:noteId', userController.deleteUserNote);
router.put('/notes/:noteId', userController.updateUserNote);


module.exports = router