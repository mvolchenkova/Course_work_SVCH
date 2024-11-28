const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController.js')

router.post('/', taskController.create)
router.get('/', taskController.getAll)
router.get('/:id', taskController.getById);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router