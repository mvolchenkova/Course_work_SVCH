const Router = require('express')
const router = new Router()
const recipeController = require('../controllers/recipeController')

router.post('/', recipeController.create)
router.get('/', recipeController.getAll)
router.get('/getbyid/:id', recipeController.getOne)
router.delete('/:id', recipeController.delete)
router.put('/:id', recipeController.update)
router.get('/search', recipeController.search)
router.get('/findFavRecipes', recipeController.findFavRecipes)

module.exports = router