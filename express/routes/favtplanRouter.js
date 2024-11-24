const Router = require('express')
const router = new Router()
const favtplanController = require('../controllers/favTplanController')

router.post('/', favtplanController.create)
router.get('/', favtplanController.getAll)
router.get('/sorted', favtplanController.getAllSorted);
router.get('/filtered', favtplanController.getAllFiltered);
router.get('/search', favtplanController.search);
router.get('/:id', favtplanController.getById);
router.put('/:id', favtplanController.update);
router.delete('/:id', favtplanController.delete);
router.get('/exists/:id', favtplanController.exists);

module.exports = router