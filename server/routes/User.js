// express variable is used to create the router
const express = require('express')

// import the user controller functions
const { userLogin, userSignup } = require('../controllers/UserController')

// create a new router in order to export it and use it in the server.js
const router = express.Router()

// login route
router.post('/login', userLogin)

// signup route
router.post('/signup', userSignup)

// export the router
module.exports = router