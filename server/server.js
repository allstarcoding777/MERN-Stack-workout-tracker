// require('dotenv').config() to access environment variables
require('dotenv').config()

// require express package and mongoose package in order to use them
const express = require('express')
const mongoose = require('mongoose')

// require workout routes from routes folder
const workoutRoutes = require('./routes/Workouts')

// create instance of express application
const app = express()

// middleware to parse incoming data
app.use(express.json())

// middleware to log requests
app.use((req, res, next) => {
console.log (req.path, req.method)
next()
})

// attaches all workout routes to application
app.use('/api/workouts', workoutRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    // listen for requests on PORT
    app.listen(process.env.PORT, () => {
      console.log('Connected to database & listening on port', process.env.PORT)
    })  
 })
   // if there is an error, log it
   .catch((error) => {
     console.log(error)
 })
