import React, { useState,useEffect } from 'react'

// Material UI
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';

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
    const [Open, setOpen] = useState();
    const [fakeState,setFakeState] = useState(false);

    const [name, setName] = useState("");
    const [body, setBody] = useState("");
    const [currentIssueId, setCurrentIssueId] = useState();
    const [changedName,setChangedName] = useState("");
    const [isNameChange, setNameChange] = useState(false);
    const [issueCount,setIssueCount] = useState();

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

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
        setIssueCount(repo.issues.totalCount)
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }

    const handleIssueSubmit = async (e,id) =>{
        e.preventDefault();
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
        }).then(result => swal({title:"Created Issue: " + result.data.createIssue.issue.title,text:"Reload Page",icon:"success"}))
        setOpen(false);
        setTimeout(function() { handleOpen(e,currentRepo); }, 0);
    }
    const handleName = (e) =>{
        setName(e.target.value)
    }
    const handleBody = (e) =>{
        setBody(e.target.value);
    }

    const handleSetNameTrue = (e,id) => {
        setCurrentIssueId(id);
        setNameChange(true);
    }
    const handleSetNameChange = (e) => {
        setChangedName(e.target.value);
    }

    const handleReOpenIssue = async (e,id) =>{
        let tempId = '"' + id + '"';
        await client.mutate({
            mutation: gql`
            mutation{
                reopenIssue(input:{issueId:${tempId}}){
                    clientMutationId
                }
            }
            `
        }).then(result => swal({title:"Sucessfuly ReOpened Issue",text:"Reload Page",icon:"success"}))
        setOpen(false);
        setTimeout(function() { handleOpen(e,currentRepo); }, 0);
    }

    const handleCloseIssue = async (e,id) =>{
        let tempId = '"' + id + '"';
        await client.mutate({
            mutation: gql`
            mutation{
                closeIssue(input:{issueId:${tempId}}){
                    clientMutationId
                }
            }
            `
        }).then(result => swal({title:"Sucessfuly Closed Issue",text:"Reload Page",icon:"success"}))
        setOpen(false);
        setTimeout(function() { handleOpen(e,currentRepo); }, 0);
    }
    const handleDeleteIssue = async (e,id) =>{
        let tempId = '"' + id + '"';
        await client.mutate({
            mutation: gql`
            mutation{
                deleteIssue(input:{issueId:${tempId}}){
                    clientMutationId
                }
            }
            `
        }).then(result => swal({title:"Sucessfuly Deleted Issue",text:"Reload Page",icon:"success"}));
        setOpen(false);
        setTimeout(function() { handleOpen(e,currentRepo); }, 0);
    }

    const handleIssueNameChange = async (e,id) =>{
        e.preventDefault();
        let tempId = '"' + id + '"';
        let title = '"' + changedName + '"';

        await client.mutate({
            mutation: gql`
            mutation{
                updateIssue(input:{id:${tempId},title:${title}}){
                    issue{
                        title
                    }
                }
            }
            `
        }).then(result => swal({title:"Successfuly Changed the Name to " + title, text:"Reload Page",icon:"success"}))
        setNameChange(false);
        setOpen(false);
        setTimeout(function() { handleOpen(e,currentRepo); }, 0);
    }
    const handleCommentDelete = async (id) =>{
        let tempId = '"' + id + '"';

        await client.mutate({
            mutation: gql`
            mutation{
                deleteIssueComment(input:{id:${tempId}}){
                    clientMutationId
                }
            }
            `
        }).then(result => swal({title:"Sucessfuly Deleted Comment",text:"Reload Page",icon:"success"}))
        setOpen(false);
        setTimeout(function() { handleOpen(currentRepo); }, 0);
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
                            <TableCell align="right"><Button onClick={(e) => handleOpen(e,repo)} className="view-button">View</Button></TableCell>
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
                        <Card style={{padding:'50px'}}>
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
                        <h1 className="modal-issue-title">Issues({issueCount})</h1>
                            <Grid container>
                            {(() => {
                                
                                if(currentIssues.length == 0){
                                    
                                    return <h1 style={{textAlign:'center',color:'grey',padding:'20px'}}>No Issues Found</h1>
                                }
                                if(currentIssues.length > 0){
                                    return(
                                    currentIssues.map(issue => {
                                    return (
                                    <Grid item sm={5} style={{padding:'20px',margin:'20px'}}>
                                    <div className="issues-div" style={{maxHeight: 500, overflow: 'auto'}}>

                                        <h1 className="issue-title">
                                            {(() => {
                                                if(isNameChange && currentIssueId == issue.id){
                                                    return(
                                                        <form onSubmit={(e) => handleIssueNameChange(e,issue.id)}>
                                                            <TextField value={changedName} onChange={handleSetNameChange} placeholder="New Title" />
                                                            <Button type="submit" >Change</Button>
                                                        </form>
                                                    )
                                                }
                                                else{
                                                    return(
                                                        <div>
                                                        {issue.title} 
                                                        <Button className={"issue-state-" + (issue.state == "OPEN" ? "open" : "closed")}>
                                                        {issue.state}
                                                        </Button>
                                                        
                                                        </div>
                                                    )
                                                }
                                            })()}
                                            
                                        </h1>
                                        
                                        <hr></hr>
                                        <div className="issue-details-div">

                                        { issue.state=="OPEN" ? <Button onClick={(e) => handleCloseIssue(e,issue.id)} className="delete-Issue">Close Issue</Button> : <Button onClick={(e) => handleReOpenIssue(e,issue.id)} className="delete-Issue">ReOpen Issue</Button>}
                                        <Button onClick={(e) => handleDeleteIssue(e,issue.id)} className="delete-Issue">Delete Issue</Button>
                                        <Button onClick={(e) => handleSetNameTrue(e,issue.id)} className="delete-Issue">Change Name</Button>
                                        <p style={{padding:'10px',color:'grey'}}>{issue.bodyText}</p>
                                        </div>
                                        {issue.comments.nodes.map(comment => {
                                            return(
                                                <Card className="comment-card">
                                                    <h4 className="comment-body">
                                                    {comment.bodyText} { username==comment.author.login ? 
                                                    <Button style={{float:'right',color:'red'}} onClick={()=>handleCommentDelete(comment.id)}>Delete</Button> : ""}
                                                    </h4>
                                                    
                                                    <p className="comment-author">By {comment.author.login}</p>
                                                </Card>
                                            )
                                        })}
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
