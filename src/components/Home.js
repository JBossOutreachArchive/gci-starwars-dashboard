import React from 'react'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

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

    return (

        <div>
            <ApolloProvider client={client}>
            <h1>{username}</h1>
            </ApolloProvider>
        </div>
    )
}
