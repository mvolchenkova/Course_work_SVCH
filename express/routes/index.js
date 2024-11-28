const Router = require('express')
const router = new Router() 
const tplanRouter = require('./tplanRouter')
const userRouter = require('./userRouter')
const favtplanRouter = require('./userRouter')
const taskRouter = require('./taskRouter')

router.use('/tplan', tplanRouter)
router.use('/user', userRouter)
router.use('/favtplan', favtplanRouter)
router.use('/task', taskRouter)

module.exports = router