const Router = require('express');
const router = new Router();
const mealLogController = require('../controllers/mealLogController');
const calorieController = require('../controllers/calorieController');

router.get('/search', calorieController.searchProduct);

router.post('/log', mealLogController.addEntry);
router.get('/log', mealLogController.getLogsByUser);
router.delete('/log/:id', mealLogController.deleteEntry);

module.exports = router;
