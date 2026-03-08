const Router = require('express')
const router = new Router()
const multer = require('multer');
const userController = require('../controllers/userController')
const upload = multer({ dest: '/data/diplomas' });

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

// , upload.single('file')
module.exports = router