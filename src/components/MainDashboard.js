import React, { useState } from 'react'

// Material UI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';


// CSS
import './css/MainDashboard.css';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

export default function MainDashboard(props) {

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

    const getId= (username) =>{
        const all = gql`
        query{
        user(login:${username}){
            id
        }
        }`;
        return all;
    }

    const followUser = (id) =>{
        const all = gql`
        mutation{
            followUser(input:{userId:${id}}){
                user{
                    name
                }
            }
        }
        `;
        return all;
    }

    const [open,setOpen] = useState(false);
    const [openFollowing,setFollowing] = useState(false);
    const [usernameFollow,setUsrFollow] = useState("");

    async function handleUsrClick(e){
        e.preventDefault();

        let id;
        let usr = '"' + usernameFollow + '"';
        await client.query({
            query: getId(usr)
            }).then(result => id = result.data.user.id)

        id = '"' + id + '"';
        await client.mutate({
            mutation: followUser(id)
            }).then(result => window.alert("You Followed: " + result.data.followUser.user.name))
    }

    const handleUsrChange = (e) =>{
        setUsrFollow(e.target.value);
    }
    const handleOpen = () =>{
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen2 = () =>{
        setFollowing(true);
    }
    const handleClose2 = () =>{
        setFollowing(false);
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
                        <Grid container>
                        <Grid item sm={3}>
                        <h1><Button onClick={handleOpen} className="followers">Followers {props.data.data.viewer.followers.nodes.length}</Button></h1>
                        <h1><Button onClick={handleOpen2} className="followers">Following {props.data.data.viewer.following.nodes.length}</Button></h1>
                        </Grid>
                        <Grid item sm={7}>
                        <h1>Repo Contributed: {props.data.data.viewer.repositoriesContributedTo.nodes.length}</h1>
                        <h1>No of Pull Request: {props.data.data.viewer.pullRequests.nodes.length}</h1>
                        </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Card>

            <Modal open={open} onClose={handleClose}><div>hello</div></Modal>
            <Modal open={openFollowing} onClose={handleClose2}>
                <div className="modal-div-following container">
                    <Card className="modal-card-following">
                        <form>
                            <TextField className="input-following" onChange={handleUsrChange} value={usernameFollow} id="outlined-basic" label="Username" variant="outlined"/>
                            <button type="submit" className="follow-submit" onClick={handleUsrClick}>Follow</button>
                        </form>
                    </Card>
                </div>
            </Modal>
        </div>
    )
}
