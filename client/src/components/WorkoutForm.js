// import useState so we can store the title, weight, and reps of the workout
import { useState } from "react"
// need to import useWorkoutContext so we can use the useWorkoutContext hook
import { useWorkoutContext } from '../hooks/useWorkoutContext'

// WorkoutForm component will display a form to add a new workout
const WorkoutForm = ()  => {
    // { dispatch } will be used to update the state of the application
    const { dispatch } = useWorkoutContext()
    // useState to stores the title, weight, and reps of the workout
    const[title,setTitle] = useState('')
    const[weight,setWeight] = useState('')
    const[reps,setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyInputs, setEmptyInputs] = useState([])

    // handleSubmit will add a new workout
    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, weight, reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            // convert the workout object to a JSON string
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // converts the response to JSON
        const json = await response.json()

        // if the response is not ok, there is an error
        if (!response.ok) {
            setError(json.error)
            setEmptyInputs(json.emptyInputs)
        }

        // if the response is ok, the workout will be added successfully
        if (response.ok) {
            setTitle('')
            setWeight('')
            setReps('')
            setError(null)
            setEmptyInputs([])
            console.log('New Workout Added ')
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }
    
    // form to add a new workout
    return (
        // e.target is the input field the user types in
        <form className="add-workout" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Name:</label>
            <input
            className={emptyInputs.includes('title') ? 'error' : ''}
            type="text"
            onChange={(e) =>  setTitle(e.target.value)}
            value={title}
            />

            <label>Weight (in lbs):</label>
            <input
            className={emptyInputs.includes('weight') ? 'error' : ''}
            type="number"
            onChange={(e) =>  setWeight(e.target.value)}
            value={weight}
            />

            <label>Reps:</label>
            <input
            className={emptyInputs.includes('reps') ? 'error' : ''}
            type="number"
            onChange={(e) =>  setReps(e.target.value)}
            value={reps}
            />  
            <button>Add</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

// export the WorkoutForm component so it can be imported in other files
export default WorkoutForm