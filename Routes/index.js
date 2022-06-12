const express = require('express')
const { ensureAuthorized } = require('../middleware/auth')
const router = express.Router()

// const accountRoutes = require('./account')
// const userRoutes = require('./User')

const userRoutes = require('./User')
const productRoutes = require('./product')

// router.use('/account', accountRoutes)
// router.use('/user', userRoutes)
router.use('/user', userRoutes)
router.use('/product', productRoutes)




module.exports = router