const User= require('../models/UserModel')

// login user
const userLogin = async (req, res) => {
res.json({ message: 'login user' })
}

// signup user
const userSignup = async (req, res) => {
    res.json({ message: 'signup user' })
    }

// export the functions
module.exports = { userLogin, userSignup }