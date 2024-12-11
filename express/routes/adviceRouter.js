const Router = require('express')
const router = new Router()
const adviceController = require('../controllers/adviceController')

router.post('/', adviceController.create)
router.get('/', adviceController.getAll)
router.delete('/:id', adviceController.delete);

module.exports = router