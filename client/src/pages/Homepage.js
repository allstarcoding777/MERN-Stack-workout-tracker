// useEffect() is used to fetch data from the backend, useState() is used to store that data 
import { useEffect, useState } from 'react'

import WorkoutInfo from '..//components/WorkoutInfo'

// this is a functional component that returns the homepage content
const Homepage = () => {
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const getWorkouts = async () => {
        const response = await fetch('/api/workouts')
        const json = await response.json()

        if (response.ok) {
            setWorkouts(json)
        }
        }
        getWorkouts()
    }, [])

    return (
        <div className="homepage">
            <div className='workouts'>
                {workouts && workouts.map((workout) => (
                <WorkoutInfo key={workout._id} workout={workout} />
                ))}
            </div>
        </div>
    )
}

export default Homepage