// require('dotenv').config() to access environment variables
require('dotenv').config()

// require express, a framework that allows us to create a server
const express = require('express')
// require mongoose, a package that allows us to connect to a database
const mongoose = require('mongoose')
// require workout routes from routes folder so we can attach them to our application
const workoutRoutes = require('./routes/Workouts')
// create instance of express application, this will allow us to create a server
const app = express()

const userRoutes = require('./routes/User')

const path = require('path');

// middleware to parse incoming data
app.use(express.json())
app.use(express.static('../client/build'));

// middleware to log requests such as GET, POST, PUT, DELETE
// req, res are objects that represent the request and response of the server, next is a function that tells express to move on to the next middleware
app.use((req, res, next) => {
  // log the request path and method
console.log (req.path, req.method)
next()
})

// attaches all workout routes to application from /api/workouts
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

const indexDirPath = path.join(path.basename(__dirname), 'client/build', 'index.html');

app.get("*",(req, res) => {
  res.sendFile('index.html', { root: '../client/build' });
});

// connect to database using mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    // listen for requests on PORT
    app.listen(process.env.PORT, () => {
      console.log(`Connected to database & listening on port ${process.env.PORT}: from  ${indexDirPath}`)
    })  
 })
   // if there is an error connecting to the database, log the error
   .catch((error) => {
     console.log(error)
 })
