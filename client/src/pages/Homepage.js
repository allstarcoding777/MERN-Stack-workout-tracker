// useEffect() is used to fetch data from the backend, useState() is used to store that data 
import { useEffect } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthenticationContext'

// components
import WorkoutInfo from '..//components/WorkoutInfo'
import WorkoutForm from '..//components/WorkoutForm'

// this is a functional component that returns the homepage content
const Homepage = () => {
    const {workouts, dispatch} = useWorkoutContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const getWorkouts = async () => {
        // fetch data from the backend, /api/workouts is the route we created in server.js to get all workouts
        const response = await fetch('/api/workouts', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'SET_WORKOUTS', payload: json})
        }
        }
        if (user) {
        getWorkouts()
        }
    }, [dispatch, user])

    return (
        <div className="homepage">
            <div className='workouts'>
                {workouts && workouts.map((workout) => (
                <WorkoutInfo key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Homepage