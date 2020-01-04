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
import Grid from '@material-ui/core/Grid';
import { FixedSizeList } from 'react-window';
import Box from '@material-ui/core/Box';

// CSS
import './css/FullData.css';

export default function FullData(props) {
    return (
        <div className="FullData">
            <Grid container>

                <Grid item sm={6} className="FullItem">
                    <Box boxShadow={3}><h1 class="Full-title">Pull Requests</h1></Box>
                    <Paper className="paperContainer">
                    <Table stickyHeader aria-label="sticky table" className="table">

                        <TableHead className="tableHead" style={{backgroundColor:'black'}}>
                            <TableRow>
                                <TableCell style={{backgroundColor:'#00CBF0',color:'white',fontSize:'18px'}}>Base Repository</TableCell>
                                <TableCell style={{backgroundColor:'#00CBF0',color:'white',fontSize:'18px'}} align="right">Branch</TableCell>
                                <TableCell style={{backgroundColor:'#00CBF0',color:'white',fontSize:'18px'}} align="right">PR Number</TableCell>
                                <TableCell style={{backgroundColor:'#00CBF0',color:'white',fontSize:'18px'}} align="right">Merged</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {props.pullRequests.map(pr => {
                                return(
                                <TableRow key={pr.baseRepository.name}>
                                    <TableCell component="th" scope="row">{pr.baseRepository.name}</TableCell>
                                    <TableCell align="right">{pr.headRefName}</TableCell>
                                    <TableCell align="right">{pr.number}</TableCell>
                                    <TableCell align="right">{ pr.merged ? "Yes" : "No" }</TableCell>
                                </TableRow>
                                )
                            })}
                        </TableBody>

                    </Table>
                    </Paper>

                </Grid>

                <Grid item sm={6} className="FullItem">
                    <Box boxShadow={3}><h1 class="Full-title">Contributions</h1></Box>
                    <Paper className="paperContainer">
                    <Table stickyHeader aria-label="sticky table" className="table">

                        <TableHead className="tableHead" style={{backgroundColor:'black'}}>
                            <TableRow>
                                <TableCell style={{backgroundColor:'#00CBF0',color:'white',fontSize:'18px'}}>Repository</TableCell>
                                <TableCell style={{backgroundColor:'#00CBF0',color:'white',fontSize:'18px'}} align="right">Link</TableCell>
                                <TableCell style={{backgroundColor:'#00CBF0',color:'white',fontSize:'18px'}} align="right">Forked</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {props.Contributions.map(contribute => {
                                return(
                                <TableRow key={contribute.name}>
                                    <TableCell component="th" scope="row">{contribute.name}</TableCell>
                                    <TableCell align="right">
                                        {
                                            contribute.homepageUrl ? <a href={contribute.homepageUrl} target="_blank">Link</a> : <a href={"https://github.com/"+contribute.nameWithOwner} target="_blank">Link</a>
                                        }
                                    </TableCell>
                                    <TableCell align="right">{ contribute.isFork ? "Yes" : "No" }</TableCell>
                                </TableRow>
                                )
                            })}
                        </TableBody>

                    </Table>
                    </Paper>

                </Grid>
                

            </Grid>
        </div>
    )
}
