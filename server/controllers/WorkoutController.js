// require the Workout model to use in our controller methods
const Workout =require('../models/WorkoutModel')
// require mongoose to check if the id is valid
const mongoose = require('mongoose')

// get all workouts 
const getAllWorkouts = async (req, res) => {

    const user_id = req.user._id

    // find all workouts and sort in descending order
    const workouts = await Workout.find({ user_id }).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// get a single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params
    // check if the id is valid, if not, return 404 error
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such workout'})
    }
    // find a workout by id
    const workout = await Workout.findById(id)
    // if no workout is found, return 404 error
    if (!workout) {
        return res.status(404).json({error: 'no such workout'})
    }
    res.status(200).json(workout)
}

// create new workout
const newWorkout = async (req, res) => {
const {title, weight, reps} = req.body
    
    let emptyInputs = []
    // check if any of the inputs are empty, if so, add them to the emptyInputs array and return 400 error
    if(!title) {
        emptyInputs.push('title')
    }
    if(!weight) {
        emptyInputs.push('weight')
    }
    if(!reps) {
        emptyInputs.push('reps')
    }
    if(emptyInputs.length > 0) {
        return res.status(400).json({ error: 'Please include all fields', emptyInputs })
    }
    // try to create a new workout and return the workout if successful
    try {
        const user_id = req.user._id
        const workout = await Workout.create({title, weight, reps, user_id})
        res.status(200).json(workout)
    }    catch (error) {
         res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    
    // check if the id is valid, if not, return 404 error
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such workout'})
    }

    // find a workout by id and delete it
    const workout = await Workout.findOneAndDelete({_id: id})

    // if no workout is found, return 404 error 
    if (!workout) {
        return res.status(400).json({error: 'no such workout'})
    }
    // return the deleted workout
    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    
    // check if the id is valid, if not, return 404 error
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such workout'})
    }

    // find a workout by id and update it
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    
    // if no workout is found, return 404 error
    if (!workout) {
        return res.status(400).json({error: 'no such workout'})
    }
    // return the updated workout
    res.status(200).json(workout)
}

// export the controller functions
module.exports = {
    newWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}