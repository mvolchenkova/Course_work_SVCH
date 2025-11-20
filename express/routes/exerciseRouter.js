const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.post('/', exerciseController.create);
router.get('/', exerciseController.getAll);
router.get('/getRandomExercises', exerciseController.getRandomExercises)
router.put('/update/:id', exerciseController.update)

module.exports = router;
