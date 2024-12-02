const Router = require('express')
const router = new Router()
const multer = require('multer');
const upload = multer({ dest: 'public/data/diplomas/' });
const userController = require('../controllers/userController')

router.post('/', userController.create)
router.get('/', userController.getAll)
router.get('/sorted', userController.getAllSorted);
router.get('/filtered', userController.getAllFiltered);
router.get('/search', userController.search);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.get('/exists/:id', userController.exists);
router.post('/check', userController.getChecked);
router.post('/logout', userController.logoutUser);
router.post('/becomeCoach', upload.single('diploma'), userController.becomeCoach);
router.put('/:id', userController.updateTrainingAim);
// router.patch('/:id', userController.addTraining)

module.exports = router