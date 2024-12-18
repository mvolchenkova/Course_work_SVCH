const Router = require('express');
const router = new Router();
const tplanController = require('../controllers/tplanController');

router.post('/', tplanController.create);
router.get('/', tplanController.getAll);
router.get('/sorted', tplanController.getAllSorted);
router.get('/filtered', tplanController.getAllFiltered);
router.get('/search', tplanController.search);
router.get('/getbyid/:id', tplanController.getById);
router.put('/:id', tplanController.update);
router.delete('/:id', tplanController.delete);
router.get('/exists/:id', tplanController.exists);
router.get('/findFavPlans', tplanController.findFavPlans)

module.exports = router;