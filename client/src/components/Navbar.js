// Link is used to link to the home page
import { Link } from "react-router-dom"

// Navbar function will return JSX that will be rendered
const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Tracker</h1>
                </Link>
            </div>
        </header>
    )
}

// export the Navbar function so it can be imported in other files
export default Navbar