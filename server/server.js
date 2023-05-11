// require express package
const express = require('express')

// attaches environment variables
require('dotenv').config()

const workoutRoutes = require('./routes/Workouts')

// starts express app, function that creates express app
const app = express()

// middleware, logs requests that come in
app.use(express.json())

app.use((req, res, next) => {
console.log (req.path, req.method)
next()
})

// attaches all workout routes to application
app.use('/api/workouts', workoutRoutes)

// listen for requests on PORT
app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT)
})
