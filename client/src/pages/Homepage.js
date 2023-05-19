// useEffect() is used to fetch data from the backend, useState() is used to store that data 
import { useEffect } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'

// components
import WorkoutInfo from '..//components/WorkoutInfo'
import WorkoutForm from '..//components/WorkoutForm'

// this is a functional component that returns the homepage content
const Homepage = () => {
    const {workouts, dispatch} = useWorkoutContext()

    useEffect(() => {
        const getWorkouts = async () => {
        const response = await fetch('/api/workouts')
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'SET_WORKOUTS', payload: json})
        }
        }
        getWorkouts()
    }, [dispatch])

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