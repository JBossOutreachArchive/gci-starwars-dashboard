import React, { useEffect, useState, useMemo } from 'react'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Navbar from './Navbar';
import gql from 'graphql-tag';
import './css/Home.css';

// Material ui
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

// Content
import MainDashboard from './MainDashboard';
import Repositories from './Repositories';

export default function Home() {

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    
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


    const [ repos,setRepos ] = useState();

    async function getRepos(){
        await client.query({
            query: gql`
            query ($number_of_repos: Int = 100) {
            viewer {
                name
                email
                location
                followers(first: $number_of_repos){
                nodes{
                    name
                }
                }
                following(first: $number_of_repos){
                nodes{
                    name
                }
                }
                avatarUrl
                repositories(last: $number_of_repos) {
                nodes {
                    id
                    name
                }
                }
                repositoriesContributedTo(last: $number_of_repos){
                nodes{
                    name
                }
                }
                pullRequests(first: 5){
                nodes{
                    headRefName
                    baseRepository {
                    name
                    }
                    number
                }
                }

            }
            }

            `}).then(result => setRepos(result))
    }
    
    useEffect(() => {
        getRepos();
    })
    return (

        <div>
            <ApolloProvider client={client}>
            <CssBaseline />
            <Container maxWidth="xl">
            <Navbar />
            
            {(() => {
                if (repos) {
                return (
                    <div>
                    <MainDashboard data={repos}/>
                    <Repositories data={repos.data.viewer.repositories.nodes}/>
                    </div>
                 )
                }
            })()}
            </Container>
            </ApolloProvider>
        </div>
    )
}
