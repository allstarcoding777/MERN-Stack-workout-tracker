// Initialize express router to create routes
const express = require('express')

// Import controller methods to handle routes
const {
    newWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/WorkoutController')
const requireAuth = require('../middleware/RequireAuth')


// creates instance of router in order to access application
const router = express.Router()

// find middleware in RequireAuth.js to verify authentification to protect routes
router.use(requireAuth)

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

// export router to be used in server.js
module.exports = router