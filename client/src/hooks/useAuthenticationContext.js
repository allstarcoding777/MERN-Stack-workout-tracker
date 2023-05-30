// this file returns us with the context of the user's properties and dispatch function
// import the AuthContext from the AuthenticationContext
import { AuthContext } from '../context/AuthenticationContext'

import { useContext } from 'react'

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }
 
    return context
}