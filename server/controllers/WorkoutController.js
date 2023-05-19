const Workout =require('../models/WorkoutModel')
const mongoose = require('mongoose')

// get all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// get a single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such workout'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'no such workout'})
    }
    res.status(200).json(workout)
}

// create a new workout
const newWorkout = async (req, res) => {
const {title, weight, reps} = req.body

    let emptyInputs = []

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

    try {
        const workout = await Workout.create({title, weight, reps})
        res.status(200).json(workout)
    }    catch (error) {
         res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(400).json({error: 'no such workout'})
    }
    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({error: 'no such workout'})
    }

    res.status(200).json(workout)
}

module.exports = {
    newWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}