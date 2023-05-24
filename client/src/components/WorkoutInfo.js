// import useWorkoutContext so we can use the useWorkoutContext hook
import { useWorkoutContext } from '../hooks/useWorkoutContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// WorkoutInfo component will display the workout information
const WorkoutInfo = ({ workout }) => {
    // dispatch is a method to update the state of the application
    const { dispatch } = useWorkoutContext()
    
    // handleClick will delete a workout
    const handleClick = async () => {
        // fetch request to delete a workout
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json =await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    // WorkoutInfo component will display the workout information
    return (
        <div className="workout-info">
            <h4>{workout.title}</h4>
            <p><strong>Weight (lbs): </strong>{workout.weight}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    )
}

// export the WorkoutInfo component so it can be imported in other files
export default WorkoutInfo