import React, { useState } from 'react'
import { Redirect } from "react-router-dom";
import './css/login.css';

// Material UI
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';


export default function Login() {

    const [username,setUsername] = useState("");
    const [token,setToken] = useState("");
    const [isLogged, setLog] = useState(false);

    async function Login(){

        const client = await new ApolloClient({
            uri: 'https://api.github.com/graphql',
            request: (operation) => {
              operation.setContext({
                headers: {
                  authorization: token ? `bearer ${token}` : ''
                }
              })
            }
        })

        await client.query({
            query: gql`
                query{
                    viewer{
                        login
                    }
                }
            `
        }).then(result => console.log("username:",result.data.viewer.login),
                          setLog(true),
                          localStorage.setItem('token',token),
                          localStorage.setItem('username',username));
    }

    if(isLogged){
        return window.location = "/home"
        
    }
    
    const tokenDesc = "Make Sure Your Token has Read/Write Access";

    return (
        <div className="home" style={{height:window.screen.height}}>
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '90vh' }}
            >
            <div className="Login">
                <Grid item sm={12} className="heading">
                    <Typography variant="h4" className="heading1">Enter Your Github Details</Typography>
                </Grid>
                
                <Grid item sm={12} className="loginCard">
                <form>
                    <input type="username" value={username} onChange={e => {setUsername(e.target.value);}} placeholder="Username"
                    ></input>
                    <br></br>
                    <Tooltip title={<h5 className="tooltip">{tokenDesc}</h5>}>
                    <input type="token" value={token} onChange={e => {setToken(e.target.value);}} placeholder="Token">
                    </input>
                    </Tooltip>
                    <br></br>
                    <button type="submit" onClick={Login} className="submit">SUBMIT</button>
                </form>
                <span className="token">Don't have a token?<a style={{color:'#00CBF0'}} href="https://github.com/settings/tokens/new">Create Token</a></span>
                </Grid>
            </div>

            </Grid>
        </div>
        
    )
}
