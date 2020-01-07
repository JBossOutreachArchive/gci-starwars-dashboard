import React, { useState,useEffect } from 'react'

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
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { Button } from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// Apollo
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';

// CSS
import './css/Repositories.css';

export default function Repositories(props) {

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const [currentRepo, setCurrentRepo] = useState();
    const [currentIssues, setCurrentIssue] = useState();
    const [Open, setOpen] = useState(false);

    const [name, setName] = useState("");
    const [body, setBody] = useState("");

    const client = new ApolloClient({
        uri: 'https://api.github.com/graphql',
        request: (operation) => {
        operation.setContext({
            headers: {
            authorization: token ? `bearer ${token}` : ''
            }
        })
        }
    })

    const handleOpen = async (e,repo) => {
        e.preventDefault();
        let name = '"' + repo.name + '"';
        let usrname = '"' + username + '"';
        let issues = [];

        await client.query({
            query: gql`
            query($number: Int = 5){
                repository(name:${name},owner:${usrname}){
                    issues(first: $number){
                        nodes{
                            id
                            title
                            state
                            bodyText
                            comments(first: $number){
                                nodes{
                                    id
                                    author{
                                        login
                                    }
                                    bodyText
                                }
                            }
                        }
                    }
                }
            }
            `
        }).then(result => issues = result.data.repository.issues.nodes);
        
        await setCurrentIssue(issues);
        await setCurrentRepo(repo);
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }

    const handleIssueSubmit = async (e,id) =>{
        let tempId = '"' + id + '"';
        let tempName = '"' + name + '"';
        let tempBody = '"' + body + '"';

        await client.mutate({
            mutation: gql`
            mutation{
                createIssue(input:{repositoryId:${tempId},title:${tempName},body:${tempBody}}){
                    issue{
                        title
                    }
                }
            }
            `
        }).then(result => window.alert("Created Issue: " + result.data.createIssue.issue.title))

    }
    const handleName = (e) =>{
        setName(e.target.value)
    }
    const handleBody = (e) =>{
        setBody(e.target.value);
    }

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
                        <TableCell style={{backgroundColor:'#00CBF0',color:'white',fontSize:'18px'}} align="right">View</TableCell>
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
                            <TableCell align="right"><Button onClick={(e) => handleOpen(e,repo)}>View</Button></TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            
            </Paper>
            <Dialog
                fullScreen
                open={Open}
                onClose={handleClose}
            >
             {(() => {
                if(currentRepo){
                    
                    return(
                        <div>
                        <AppBar className="appbar">
                        <Toolbar className="toolbar">
                          <IconButton className="closeIcon" edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                          </IconButton>
                          <Typography variant="h4" className="repo-heading">
                            {currentRepo.name.toUpperCase()}
                          </Typography>
                        </Toolbar>
                      </AppBar>
                        <div className="modal-div-following-2">
                        <div className="modal-div-following-2-child">
                            
                            <div className="repo-data">
                                <Grid container>
                                    <Grid item sm={2} className="repo-data-card">
                                        <Card ><h1 className="forkCountHd">Forks: <span className="forkCount">{currentRepo.forkCount}</span></h1></Card>
                                    </Grid>

                                    <Grid item sm={2} className="repo-data-card">
                                        <Card><h1 className="forkCountHd">Stars: <span className="forkCount">{currentRepo.stargazers.totalCount}</span></h1></Card>
                                    </Grid>

                                    <Grid item sm={4} className="repo-data-card">
                                        <Card><h1 className="forkCountHd">Pull Requests: <span className="forkCount">{currentRepo.pullRequests.totalCount}</span></h1></Card>
                                    </Grid>

                                    <Grid item sm={3} className="repo-data-card">
                                        <Card><h1 className="forkCountHd">Collaborators: <span className="forkCount">{currentRepo.collaborators.totalCount}</span></h1></Card>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>

                        <div className="modal-div-following-3-child" >
                        <Card style={{padding:'20px'}}>
                        <h1 className="modal-issue-title">Create Issue</h1>
                        <form onSubmit={(e) => handleIssueSubmit(e)} className="form-issue">
                            <div className="form-div">
                            <TextField id="outlined-basic" variant="outlined" className="issue-input-name" value={name} onChange={handleName} placeholder="Name"/>
                            <TextareaAutosize rowMin={4} className="issue-input-body" value={body} onChange={handleBody} placeholder="Description"/>
                            <Button className="issue-submit" type="submit" onClick={(e) => handleIssueSubmit(e,currentRepo.id)}>CREATE ISSUE</Button>
                            </div>
                        </form>
                        </Card>
                        <br></br>
                        <br></br>
                        <Card style={{padding:'20px'}}>
                        <h1 className="modal-issue-title">Issues</h1>
                            <Grid container>
                            {(() => {
                                
                                if(currentIssues.length == 0){
                                    
                                    return <h1 style={{textAlign:'center',color:'grey',padding:'20px'}}>No Issues Found</h1>
                                }
                                if(currentIssues.length > 0){
                                    return(
                                         currentIssues.map(issue => {
                                            return (
                                            <Grid item sm={6}>
                                            <div className="issues-div" style={{maxHeight: 500, overflow: 'auto'}}>
                                                <h1 className="issue-title">{issue.title} 
                                                <Button className={"issue-state-" + (issue.state == "OPEN" ? "open" : "closed")}>
                                                {issue.state}
                                                </Button></h1>
                                                <hr></hr>
                                            </div>
                                            </Grid>
                                            )
                                    })
                                    )
                                }
                            })()}
                            </Grid>
                        </Card>
                        </div>
                        
                        </div>
                        </div>
                    )
                }else{
                    return <h1>Loading</h1>
                }
             })()}
            </Dialog>
            </div>
        </div>
    )
}
