import React from 'react';
import './App.css';

import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Starships from './entities/Starships'
import Vehicles from './entities/Vehicles'
import Peoples from './entities/Peoples'
import Planets from './entities/Planets'
import Species from './entities/Species'



import 'react-bulma-components/dist/react-bulma-components.min.css';

import { Heading } from 'react-bulma-components';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import EntityNavigation from './EntityNavigation';

const client = new ApolloClient({
  uri: 'https://swapi.graph.cool/'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router className="App">
        <header className="App-header stars">
          <Heading size={2} className="Title">SW-API<br/>WARS</Heading>
          <a href="https://github.com/reaganiwadha/gci-starwars-dashboard" className="Credit">By Regan Iwadha/melunian</a>
          <EntityNavigation/>
          <Switch>
            <Route path="/starships/:page">
              <Starships />
            </Route>
            <Route path="/vehicles/:page">
              <Vehicles />
            </Route>
            <Route path="/peoples/:page">
              <Peoples />
            </Route>
            <Route path="/planets/:page">
              <Planets />
            </Route>
            <Route path="/species/:page">
              <Species />
            </Route>
    
            <Route path="/starships">            
              <Redirect to="/starships/1" />
            </Route>
            <Route path="/species">            
              <Redirect to="/species/1" />
            </Route>
            <Route path="/vehicles">            
              <Redirect to="/vehicles/1" />
            </Route>
            <Route path="/peoples">            
              <Redirect to="/peoples/1" />
            </Route>
            <Route path="/planets">            
              <Redirect to="/planets/1" />
            </Route>
            
            
            
          </Switch>
        </header>
      </Router>
    </ApolloProvider>
  );
}

export default App;