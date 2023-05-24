// import the WorkoutContext from the WorkoutContext file
import { WorkoutContext } from '../context/WorkoutContext'
// useContext is a hook that allows us to use the WorkoutContext
import { useContext } from 'react'

// custom hook to use the WorkoutContext which contains the state and methods to update the state of the application
export const useWorkoutContext = () => {
    const context = useContext(WorkoutContext)

    // if the context is undefined, it means that the useWorkoutContext hook is not used inside a WorkoutContextProvider
    if (!context) {
        throw Error('useWorkoutContext must be used inside a WorkoutContextProvider')
    }
    // return the context so we can use it inside other components
    return context
}
