const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.post('/', exerciseController.create);
router.get('/', exerciseController.getAll)

module.exports = router;
