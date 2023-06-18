const router = require('express').Router()
const companyRouter = require('./company')
const jobRouter = require('./job')
const userRouter = require('./user')

router.use('/companies',companyRouter)
router.use('/jobs',jobRouter)
router.use('/users',userRouter)

module.exports = router