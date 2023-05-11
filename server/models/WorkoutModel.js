// mongoose allows us to create our models and schemas for our data in the database
const mongoose = require('mongoose')

// mongoose.Schema is a class that allows us to create a schema for our data
const Schema = mongoose.Schema

// create a schema for our workouts, schema is a blueprint for our data
const workoutSchema = new Schema({
    title: {
    type: String,
    required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
    }, {timestamps: true})

    // export our model so we can use it in our routes
    module.exports = mongoose.model('Workout', workoutSchema)