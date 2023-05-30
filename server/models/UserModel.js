// require mongoose, mongoose is an ODM (Object Document Mapper) that allows us to interact with MongoDB
const mongoose = require('mongoose')
// require bcrypt, bcrypt is a library that allows us to hash passwords
const bcrypt = require('bcrypt')
// require validator, validator is a library that allows us to validate data
const validator = require('validator')

// create a schema, a schema is a blueprint for our data
const Schema = mongoose.Schema

// create a user schema with email and password fields
const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email, password) {
    
    //if email or password is missing, throw error
    if (!email || !password) {
        throw Error('all fields required')
    }
    // if email is invalid, throw error
    if (!validator.isEmail(email)) {
        throw Error('invalid email')
    }
    // if password is not strong enough, throw error
    if(!validator.isStrongPassword(password)) {
        throw Error('password not strong enough')
    }
    // check if email is in use
    const exists = await this.findOne({ email })
    // if not, throw error
    if (exists) {
        throw Error('email already in use')
    }
    // salt password, which means to add random characters to the password
    const salt = await bcrypt.genSalt(12)
    // hash password, hashing means to encrypt the password
    const hash = await bcrypt.hash(password, salt)
    // create user
    const user = await this.create({ email, password: hash})

    return user

}

// static login method
userSchema.statics.login = async function(email, password) {
    // if email or password is missing, throw error
    if (!email || !password) {
        throw Error('all fields required')
    }
    // if email is invalid, throw error
    const user = await this.findOne({ email})
    if (!user) {
        throw Error('invalid email')
    }

    // compare password with hashed password
    const mathches = await bcrypt.compare(password, user.password)

    // if password does not match, throw error
    if (!mathches) {
        throw Error('invalid password')
    }

    return user
}

// mongoose.model is a function that takes two arguments - the name of the model and the schema
module.exports = mongoose.model('User', userSchema)

