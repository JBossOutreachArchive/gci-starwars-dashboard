import React from 'react'

// Material UI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// CSS
import './css/MainDashboard.css';

export default function MainDashboard(props) {
    return (
        <div>
            <Card className="container">
                <Grid container >
                    <Grid item sm={3} className="GridItem">
                        <img className="avatar" src={props.data.data.viewer.avatarUrl} />
                    </Grid>
                    <Grid item sm={4} className="GridItem">
                        <h1>{props.data.data.viewer.name}</h1>
                        <h3 style={{color:'grey'}}>@{localStorage.getItem('username')}</h3>
                        <h2>Email: {props.data.data.viewer.email}</h2>
                        <h2>Location: {props.data.data.viewer.location}</h2>
                        <h2></h2>
                    </Grid>
                    <Grid item sm={5} className="GridItem">
                        <h1>Followers {props.data.data.viewer.followers.nodes.length}</h1>
                        <h1>Following {props.data.data.viewer.following.nodes.length}</h1>
                        <h1>Repo Contributed: {props.data.data.viewer.repositoriesContributedTo.nodes.length}</h1>
                        <h1>No of Pull Request: {props.data.data.viewer.pullRequests.nodes.length}</h1>
                        
                        <h2></h2>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}
