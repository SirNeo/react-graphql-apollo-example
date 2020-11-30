import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';

import {
    ApolloProvider, 
    ApolloClient, 
    HttpLink,
    InMemoryCache,
    gql,
} from '@apollo/client'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:5000/graphql',
    // fetchOptions: {
    //   mode: 'no-cors',
    // },
    // credentials: 'include',
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  }),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
})

const GET_ALL_MEMBERS = gql`{
  allMembers {
    nodes {
      id
      firstname
      surname
      address
    }
  }
}
`;

client
  .query({ query: GET_ALL_MEMBERS} )
  .then(result => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
