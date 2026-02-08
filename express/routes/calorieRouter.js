const Router = require('express');
const router = new Router();
const calorieController = require('../controllers/calorieController');

router.get('/search', calorieController.searchProduct);
router.post('/log', calorieController.addMealLog);
router.get('/logs/:userId', calorieController.getTodaysLogs);

module.exports = router;