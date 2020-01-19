import React from 'react';

import {NavLink } from 'react-router-dom';
import { Button } from 'react-bulma-components';

import './EntityNavigation.css'

const EntityNavigation = () =>{
    return(
        <div style={{margin:'1em'}}>
            <NavLink to="/starships" activeClassName="bt-active"><Button color="black">Starships</Button></NavLink>
            <NavLink to="/peoples" activeClassName="bt-active"><Button color="black">People</Button></NavLink>
            <NavLink to="/vehicles" activeClassName="bt-active"><Button color="black">Vehicles</Button></NavLink>
            <NavLink to="/planets" activeClassName="bt-active"><Button color="black">Planets</Button></NavLink>
            <NavLink to="/species" activeClassName="bt-active"><Button color="black">Species</Button></NavLink>            
        </div>
    )
}

export default EntityNavigation