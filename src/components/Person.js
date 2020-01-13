import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

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
        align: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
          },
        
    },
    tableHead:{
        padding: '20x',
        backgroundColor: 'white'
    },
    thead: {
        fontSize: '20px',
        
        color:'black'
    },
    tcell: {
        "&:hover":{
            color: '#FFE81F'
        },
        fontSize: '18px',
        
        color: 'grey'
    },
    row:{
        "&:hover":{
            boxShadow: '10px 10px 10px',
        },
    }

});


export class Person extends Component {

    
    render() {

        let { classes } = this.props;
        
        return (
            <div>
        
                <Paper className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                            
                    <TableHead className={classes.tableHead}>
                        <TableRow style={{color:'white'}}>
                            <TableCell className={classes.thead}>Name</TableCell>
                            <TableCell className={classes.thead} align="right">Gender</TableCell>
                            <TableCell className={classes.thead} align="right">Birth Year</TableCell>
                            <TableCell className={classes.thead} align="right">Mass</TableCell>
                            <TableCell className={classes.thead} align="right">Eye color</TableCell>
                            <TableCell className={classes.thead} align="right">Skin Color</TableCell>
                            <TableCell className={classes.thead} align="right">Hair Color</TableCell>             
                            <TableCell className={classes.thead} align="right">Films</TableCell>     
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(() => {
                            if(this.props.people == null){
                                return (
                                    <div className={classes.loading}>
                                        <LinearProgress />
                                    </div>
                                )
                                }else{
                                return(
                                this.props.people.map(person => (
                                    <TableRow row={person.name} className={classes.row} key={person.name}>
                                        <TableCell className={classes.tcell} component="th" scope="row">{person.name}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{person.gender}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{person.birth_year}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{person.mass}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{person.eye_color}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{person.skin_color}</TableCell>
                                        <TableCell className={classes.tcell} align="right">{person.hair_color}</TableCell>

                                        <TableCell className={classes.tcell} align="right">
                                            
                                            {person.films.map(film => (
                                                    <Typography>{film.title},</Typography>
                                            ))}
                                            
                                        </TableCell>

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

Person.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Person);