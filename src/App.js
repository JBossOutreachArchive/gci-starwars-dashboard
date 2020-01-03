import React, { Component } from 'react'
import './App.css';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home.js';
import NavBar from './components/navbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



const styles = theme=> ({ 
  root: {
    backgroundColor: '#F0F0F0',
  }
})

export class App extends Component {
  render() {
    let { classes } = this.props;

    return (

        <Router>
        <div className={classes.root}>
          <NavBar />
          <Switch>  

            <Route exact path="/" component={Home} />

          </Switch>
          </div>
        </Router>
        
      
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
