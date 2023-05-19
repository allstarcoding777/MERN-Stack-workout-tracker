import { useState } from "react"
import { useWorkoutContext } from '../hooks/useWorkoutContext'

const WorkoutForm = ()  => {
    const { dispatch } = useWorkoutContext()
    const[title,setTitle] = useState('')
    const[weight,setWeight] = useState('')
    const[reps,setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyInputs, setEmptyInputs] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, weight, reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyInputs(json.emptyInputs)
        }
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

export default WorkoutForm