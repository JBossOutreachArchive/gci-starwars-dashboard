import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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


export class StarShip extends Component {
    
    render() {

        let { classes } = this.props;
        
        return (
            <div>
        
            <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                            
                <TableHead className={classes.tableHead}>
                    <TableRow style={{color:'white'}}>
                        <TableCell className={classes.thead}>Name</TableCell>
                        <TableCell className={classes.thead} align="right">Model</TableCell>
                        <TableCell className={classes.thead} align="right">Crew</TableCell>
                        <TableCell className={classes.thead} align="right">Passengers</TableCell>
                        <TableCell className={classes.thead} align="right">Cost</TableCell>
                
                        <TableCell className={classes.thead} align="right">MGLT</TableCell>
                        <TableCell className={classes.thead} align="right">Hyperdrive Rating</TableCell>
                        <TableCell className={classes.thead} align="right">Cargo Capacity</TableCell>
                        <TableCell className={classes.thead} align="right">Manufacturer</TableCell>
                        
                    </TableRow>
                </TableHead>

                <TableBody>
                    {(() => {
                            if(this.props.starship == null){
                                return (
                                    <h1 className={classes.loading}>Loading</h1>
                                )
                            }else{
                                return(
                                    this.props.starship.map(starship => (
                                                   
                                    <TableRow row={starship.name} className={classes.row}>
                                        <TableCell className={classes.tcell} component="th" scope="row">{starship.name}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{starship.model}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{starship.crew}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{starship.passengers}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{starship.cost_in_credits}</TableCell>
                                        
                                        <TableCell className={classes.tcell} align="right">{starship.MGLT}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{starship.hyperdrive_rating}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{starship.cargo_capacity}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{starship.manufacturer}</TableCell>
                                        
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

StarShip.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StarShip);