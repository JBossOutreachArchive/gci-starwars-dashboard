import React, { Component } from 'react'
import { AppBar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import starwars from './starwars.png';

const styles = theme=> ({
    appBar: {
        alignItems: 'center',
        paddingTop: '5px',
        paddingBottom: '5px',
        background: 'black',
    },

    menuButton: {
       
       padding: '10px',
       margin: '10px',
       color: 'black',
       backgroundColor: '#FFE81F',
       border: '2px white',
       "&:hover": {
        boxShadow: "10px 10px 10px #FFE81F",
        backgroundColor: 'black',
        color: '#FFE81F'
    }
    },
      title: {
        fontWeight: 'bold',
        fontSize: '55px',
        flexGrow: 1,
        color: '#FFE81F',
        textAlign: 'center',
    },
    logo:{
        align: 'center',
        width: '200px',
        height: '80px',
    }


})

export class navbar extends Component {
    render() {
        let { classes } = this.props;

        return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>

                    <IconButton color="inherit" >
                        <img src={starwars} className={classes.logo} alt="logo"></img>
                    </IconButton>

                    <Typography className={classes.title}>
                        DASHBOARD
                    </Typography>

                   
                </Toolbar>
            </AppBar>
 
        )
    }
}

navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(navbar);
