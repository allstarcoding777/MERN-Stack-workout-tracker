// import React so we can use JSX to create our components, JSX stands for JavaScript XML, it allows us to write HTML in React
import React from 'react';
// import ReactDOM so we can render our application
import ReactDOM from 'react-dom/client';
import './index.css';
// the App component is the parent component of our application
import App from './App';
// import WorkoutContextProvider so we can use the WorkoutContextProvider component to wrap our application
import { WorkoutContextProvider } from './context/WorkoutContext';
// import the AuthContextProvider component so we can wrap our application with it
import { AuthContextProvider } from './context/AuthenticationContext';

// render the App component to the root element in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <WorkoutContextProvider>
    <App />
    </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);