const Router = require('express')
const router = new Router() 
const tplanRouter = require('./tplanRouter')
const userRouter = require('./userRouter')
const favtplanRouter = require('./userRouter')

router.use('/tplan', tplanRouter)
router.use('/user', userRouter)
router.use('/favtplan', favtplanRouter)

module.exports = router