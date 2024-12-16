const Router = require('express')
const router = new Router() 
const tplanRouter = require('./tplanRouter')
const userRouter = require('./userRouter')
const favtplanRouter = require('./userRouter')
const taskRouter = require('./taskRouter')
const recipeRouter = require('./recipeRouter')
const articleRouter = require('./acrticleRouter')

router.use('/tplans', tplanRouter)
router.use('/users', userRouter)
router.use('/favtplans', favtplanRouter)
router.use('/tasks', taskRouter)
router.use('/recipes', recipeRouter)
router.use('/articles', articleRouter)

module.exports = router