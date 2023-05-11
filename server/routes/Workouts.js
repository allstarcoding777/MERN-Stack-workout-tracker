const express = require('express')
const Workout =require('../models/WorkoutModel')

// creates instance of router in order to access application
const router = express.Router()

// get all workouts
router.get('/', (req, res) => {
    res.json({mssg: 'get all workouts'})
})

// get a single workout
router.get('/:id', (req, res) => {
   res.json({mssg: 'get a single workout'}) 
})

// post a new workout
router.post('/', async (req, res) => {
    const {title, weight, reps} = req.body

    try {
        const workout = await Workout.create({title, weight, reps})
        res.status(200).json(workout)
    }    catch (error) {
         res.status(400).json({error: error.message})
    }
})

// delete a workout
router.delete('/:id', (req, res) => {
    res.json({mssg: 'delete a workout'})
})

// update a workout
router.patch('/:id', (req, res) => {
    res.json({mssg: 'update a workout'})
})

module.exports = router