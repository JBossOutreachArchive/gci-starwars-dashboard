import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import ShowComponents from './index.jsx';
function App() {
  return (
    <Router>
      <Route exact path="/" component={ ShowComponents }/>
    </Router>
  );
}

export default App;
