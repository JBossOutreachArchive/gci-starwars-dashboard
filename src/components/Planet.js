import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme=> ({
    card:{
        margin: '10px',
        color: '#FFE81F',
        backgroundColor: 'black'
    },
    name:{

        borderBottom: '2px white'
    },
    root:{
        color: '#FFE81F'
    },
    table:{
        
        backgroundColor:'white',
        color: 'grey'
    },
    loading:{
        flexGrow: 1,
        textAlign:"center",
        
    },
    tableHead:{
        padding: '20x',
        backgroundColor: 'white'
    },
    thead: {
        fontSize: '20px',
        textAlign:'center',
        color:'black'
    },
    tcell: {
        "&:hover":{
            color: '#FFE81F'
        },
        fontSize: '18px',
        textAlign: 'center',
        color: 'grey'
    },
    row:{
        "&:hover":{
            boxShadow: '10px 10px 10px',
        },
    }

});



export class Planet extends Component {
    
    
    render() {

        let { classes } = this.props;
        
        return (
            <div>
        
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                
                    <TableHead className={classes.tableHead}>
                        <TableRow style={{color:'white'}}>
                        
                            <TableCell className={classes.thead}>Name</TableCell>
                            <TableCell className={classes.thead} align="right">Population</TableCell>
                            <TableCell className={classes.thead} align="right">Gravity</TableCell>
                            <TableCell className={classes.thead} align="right">Climate</TableCell>
                            <TableCell className={classes.thead} align="right">Diameter</TableCell>
                            <TableCell className={classes.thead} align="right">Surface Water</TableCell>
                            <TableCell className={classes.thead} align="right">Terrain</TableCell>
                            
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(() => {
                            if(this.props.planet == null){
                                return (
                                    <h1 className={classes.loading}>Loading</h1>
                                )
                            }else{
                                return(
                                    this.props.planet.map(planet => (
                                    <TableRow row={planet.name} className={classes.row}>
                                        <TableCell className={classes.tcell} align="right">{planet.name}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{planet.population}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{planet.gravity}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{planet.climate}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{planet.diameter}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{planet.surface_water}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{planet.terrain}</TableCell>
                                        
                                    </TableRow>
                                    ))
                                    )
                                    }
                                })()}
                    </TableBody>

                </Table>
            </Paper>
            
            </div>
        )
    }
}

Planet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Planet);