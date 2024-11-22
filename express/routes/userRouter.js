const Router = require('express')
const router = new Router()
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

// router.put('/', userController.updateUser)

module.exports = router