import React from 'react'

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from './images/logo.png';

// CSS
import './css/navbar.css';

export default function Navbar() {

    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    const handleLogout = () =>{
      localStorage.removeItem('username')
      localStorage.removeItem('token')

    }
    return (
        <div className="main">
        <AppBar position="static" className="nav">
        <Toolbar>
          <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
            <img src={logo} className="logo" />
          </IconButton>
          <Typography variant="h4" className="title">
            GITHUB DASHBOARD
          </Typography>
          <Button className="logout" onClick={handleLogout}><a href="/login" className="logout-link">Logout</a></Button>
          <Typography variant="h6" className="item">{username.toUpperCase()}</Typography>
        </Toolbar>
      </AppBar>
        </div>
    )
}
