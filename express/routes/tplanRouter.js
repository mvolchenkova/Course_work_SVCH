const Router = require('express');
const router = new Router();
const tplanController = require('../controllers/tplanController');

router.post('/', tplanController.create);
router.get('/', tplanController.getAll); // Corrected method name

module.exports = router;