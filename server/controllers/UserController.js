// require the User model
const User= require('../models/UserModel')
// require jsonwebtoken
const jwt = require('jsonwebtoken')

// generate token function - this function will be used to create tokens for users
const generateToken = (_id) => {
    // return jwt.sign(payload, secretOrPrivateKey, [options, callback])
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '2d'})
}

// login user
const userLogin = async (req, res) => {
    const {email, password} = req.body

    try {
        // login user with email and password
        const user = await User.login(email, password)
        // create token
        const token = generateToken(user._id)
        // send token and email to client
        res.status(200).json({email, token})
    // if there is an error, send error message to the client
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const userSignup = async (req, res) => {
    // get email and password from req.body
    const {email, password} = req.body

    try {
        // create user with email and password
        const user = await User.signup(email, password)
        // create token
        const token = generateToken(user._id)
        // send token and email to client
        res.status(200).json({email, token})
    // if there is an error, send error message to the client
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// export the functions
module.exports = { userLogin, userSignup }