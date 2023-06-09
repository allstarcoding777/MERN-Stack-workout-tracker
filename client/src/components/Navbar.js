// Link is used to link to the home page
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/UseLogout'
import { useAuthContext } from '../hooks/useAuthenticationContext'

// Navbar function will return JSX that will be rendered
const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    // handleClick function will logout the user
    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Tracker</h1>
                </Link>
                <nav className='nav-items'>
                    {!user && (
                        <div className='navbtns'>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                    )}
                    {user && (
                        <div>
                    <span>{user.email}</span>
                    <button className="logout" onClick={handleClick}>Logout</button>
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

// export the Navbar function so it can be imported in other files
export default Navbar