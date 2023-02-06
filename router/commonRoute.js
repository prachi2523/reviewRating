const companyRoute = require('./companyRoutes')
const reviewRoute = require('./reviewRoute')
const userRoute = require('./userRouter')
const express = require('express');
const router = express.Router();

router.use('/user', userRoute)
router.use('/company', companyRoute)
router.use('/review', reviewRoute)

module.exports = router