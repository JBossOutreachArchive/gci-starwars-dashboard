import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import CircularProgress from '@material-ui/core/CircularProgress';
import swal from 'sweetalert';

import './css/Projects.css';

export default function Projects(props) {

    const token = localStorage.getItem('token');

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

    const handleSubmit = async (e,id) =>{
        
        let tempId = '"' + id + '"';
        
        await client.mutate({
            mutation: gql`
            mutation{
                deleteProject(input:{projectId:${tempId} }){
                    owner{
                        id
                    }
                }
            }
            `
        }).then(result => swal({title:"Successfully Deleted",icon:"success"}))
    }
    const handleState = async (e,id,state) =>{
        let tempId = '"' + id + '"';

        await client.mutate({
            mutation: gql`
            mutation{
                updateProject(input:{projectId:${tempId},state:${state}}){
                    project{
                        name
                        state
                    }
                }
            }
            `
        }).then(result => swal({title:result.data.updateProject.project.name + " State: " + result.data.updateProject.project.state,icon:"success"}));
        
    }

    return (
        <Card className="project-home">
            <Grid container>
            {
                props.data.map(project => {
                    return(
                    <Grid item sm={3}>
                        <Card className="ProjectCard">
                            <Typography variant="h4" className="projectName">{project.name.toUpperCase()}</Typography>
                            <hr></hr>

                            <CardContent className="project-detail">
                                <h3 className="project-detail-item">Creator: {project.creator.login}</h3>
                                <h3 className="project-detail-item">State: {project.state}</h3>

                                <Grid container>
                                <Grid item sm={5} className="btn-grid">
                                <Button type="submit" className="project-btn" onClick={(e) => handleState(e,project.id,project.state == "OPEN" ? "CLOSED" : "OPEN")}>
                                    {project.state == "OPEN" ? "CLOSE" : "OPEN"}
                                </Button>
                                </Grid>

                                <Grid item sm={5} className="btn-grid">
                                <Button type="submit" className="project-btn" onClick={(e) => handleSubmit(e,project.id)}>Delete</Button>
                                </Grid>

                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                )
                })}
            </Grid>
        </Card>
    )
}
