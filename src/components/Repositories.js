import React from 'react'

// Material UI
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { FixedSizeList } from 'react-window';

// CSS
import './css/Repositories.css';

export default function Repositories(props) {

    // Reverse the Repo array 
    props.data.reverse();

    return (
        <div>
            <br></br>
            <div>
            <Paper className="paperContainer">
            
            <Table stickyHeader aria-label="sticky table" className="table">

                <TableHead className="tableHead" style={{backgroundColor:'black'}}>
                    <TableRow>
                        <TableCell style={{backgroundColor:'#00CBF0',color:'white',fontSize:'18px'}}>Name</TableCell>
                        <TableCell style={{backgroundColor:'#00CBF0',color:'white',fontSize:'18px'}} align="right">Forks</TableCell>
                        <TableCell style={{backgroundColor:'#00CBF0',color:'white',fontSize:'18px'}} align="right">Stars</TableCell>
                        <TableCell style={{backgroundColor:'#00CBF0',color:'white',fontSize:'18px'}} align="right">Collaborators</TableCell>
                        <TableCell style={{backgroundColor:'#00CBF0',color:'white',fontSize:'18px'}} align="right">Pull Requests</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    { props.data.map(repo => {
                        return(
                        <TableRow key={repo.id}>
                            <TableCell component="th" scope="row">{repo.name}</TableCell>
                            <TableCell align="right">{repo.forkCount}</TableCell>
                            <TableCell align="right">{repo.stargazers.totalCount}</TableCell>
                            <TableCell align="right">{repo.pullRequests.totalCount}</TableCell>
                            <TableCell align="right">{repo.collaborators.totalCount}</TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            
            </Paper>
            </div>
        </div>
    )
}
