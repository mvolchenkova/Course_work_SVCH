const Router = require('express')
const router = new Router()
const recipeController = require('../controllers/recipeController')

router.post('/', recipeController.create)
router.get('/', recipeController.getAll)
router.get('/:idRecipe', recipeController.getOne)
router.delete('/:idRecipe', recipeController.delete)
router.put('/:idRecipe', recipeController.update)

module.exports = router