const Router = require('express');
const router = new Router();
const muscleController = require('../controllers/muscleController');

router.get('/', muscleController.getAll);

module.exports = router;