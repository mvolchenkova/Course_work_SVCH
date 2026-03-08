const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/reviewController')

router.post('/', reviewController.create);
router.get('/', reviewController.getAll);
// router.delete('/:id', reviewController.delete);
router.put('/answer', reviewController.updateAnswer)

module.exports = router