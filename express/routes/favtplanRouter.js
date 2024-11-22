const Router = require('express')
const router = new Router()
const favtplanController = require('../controllers/favTplanController')

router.post('/', favtplanController.create)
router.get('/', favtplanController.getAll)
// router.put('/', favtplanController.updateTplan)

module.exports = router