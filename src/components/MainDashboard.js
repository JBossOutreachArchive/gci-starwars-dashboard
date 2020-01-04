import React, { useState } from 'react'

// Material UI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

// CSS
import './css/MainDashboard.css';

// Edit Profile Component
import Profile from './Forms/Profile';

export default function MainDashboard(props) {

    const [open,setOpen] = useState(false);

    const handleOpen = () =>{
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <div>
            <Card className="container" boxshadow={5}>
                <Grid container >
                    <Grid item sm={2} className="GridItem">
                        <img className="avatar" src={props.data.data.viewer.avatarUrl} />
                    </Grid>
                    <Grid item sm={4} className="GridItem textItem">
                        <h1 className="name">{props.data.data.viewer.name.toUpperCase()}</h1>
                        <h3 style={{color:'grey'}} className="username">@{localStorage.getItem('username')}</h3>
                        <h2>Email: {props.data.data.viewer.email}</h2>
                        <h2>Location: {props.data.data.viewer.location}</h2>
                        <h2></h2>
                    </Grid>
                    <Grid item sm={6} className="textItem">
                        <h1>Followers {props.data.data.viewer.followers.nodes.length}</h1>
                        <h1>Following {props.data.data.viewer.following.nodes.length}</h1>
                        <h1>Repo Contributed: {props.data.data.viewer.repositoriesContributedTo.nodes.length}</h1>
                        <h1>No of Pull Request: {props.data.data.viewer.pullRequests.nodes.length}</h1>
                        <Button onClick={handleOpen}>Edit</Button>

                    </Grid>
                </Grid>
            </Card>

            <Modal open={open} onClose={handleClose}><div>hello <Profile /></div></Modal>
        </div>
    )
}
