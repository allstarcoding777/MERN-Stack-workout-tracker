const express = require('express')
const {
    newWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/WorkoutController')

// creates instance of router in order to access application
const router = express.Router()

// get all workouts
router.get('/', getAllWorkouts)

// get a single workout
router.get('/:id', getSingleWorkout)

// post a new workout
router.post('/', newWorkout)

// delete a workout
router.delete('/:id', deleteWorkout)

// update a workout
router.patch('/:id', updateWorkout)

module.exports = router