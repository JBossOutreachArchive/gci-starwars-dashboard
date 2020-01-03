// React Imports
import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Home from './components/Home';
import Login from './components/Login';

// CSS
import './App.css';

// Other
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <Router>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" component={Home} />
    </Router>
  );
}

export default App;
