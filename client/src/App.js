// BrowserRouter is the parent component that wraps all the routes, Routes is the child component that contains all the routes, Route is the child component that contains a single route
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// useAuthContext is a custom hook that we created to get the user from the AuthenticationContext
import { useAuthContext } from './hooks/useAuthenticationContext';

// import page components
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Login from './pages/Login'
import Signup from './pages/Signup'

// App function will return JSX that will be rendered
function App() {
  // get the user from the AuthenticationContext so we can check if the user is logged in or not and render the correct page
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={user ? <Homepage /> : <Navigate to="/login"/>}
          />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />}
          />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

// export the App function so it can be imported in other files
export default App;
