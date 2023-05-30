// BrowserRouter is the parent component that wraps all the routes, Routes is the child component that contains all the routes, Route is the child component that contains a single route
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import page components
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Login from './pages/Login'
import Signup from './pages/Signup'

// App function will return JSX that will be rendered
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

// export the App function so it can be imported in other files
export default App;
