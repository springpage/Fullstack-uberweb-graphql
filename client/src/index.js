import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';

// Setup apollo client
let uri;

if (process.env.NODE_ENV === 'production') {
  uri = 'https://tranquil-brook-76662.herokuapp.com/graphql';
} else {
  uri = 'http://localhost:5000/graphql';
}

const client = new ApolloClient({
  uri: uri,
  credentials: 'include'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.querySelector('#root')
);
