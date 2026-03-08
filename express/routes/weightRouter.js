const express = require('express');
const router = express.Router();
const weightController = require('../controllers/weightController');

router.get('/:userId', weightController.getWeights);
router.post('/:userId', weightController.addWeight);
router.delete('/:weightId', weightController.deleteWeight);

module.exports = router;