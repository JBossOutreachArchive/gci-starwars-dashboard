import React, { useEffect, useState } from 'react'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Navbar from './Navbar';
import gql from 'graphql-tag';

export default function Home() {
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

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    async function getRepos(){
        await client.query({
            query: gql`
            query($number_of_repos:Int = 100) {
            viewer {
                name
                repositories(last: $number_of_repos) {
                nodes {
                    name
                }
                }
            }
            }
            `
        }).then(result => {
            console.log("received:",result.data.viewer.repositories.nodes)
            
        })
    }

    useEffect(() => {
        getRepos();
    })

    return (

        <div>
            <ApolloProvider client={client}>
            <Navbar />
            <h1>{username}</h1>
            </ApolloProvider>
        </div>
    )
}
