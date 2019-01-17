import React from 'react';
import ReactDOM from 'react-dom';
// import { ApolloClient } from 'apollo-client';
// // import { HttpLink } from 'apollo-link-http';
// // import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloProvider } from 'react-apollo'; 
import App from './components/App.jsx';
import './css/styles.css';

// const client = new ApolloClient({
//     uri: 'http://localhost:4000/graphql'
//     // link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
//     // cache: new InMemoryCache(),
// })

ReactDOM.render(
    // <ApolloProvider client={client}>
        <App />,
    // </ApolloProvider>,
    document.getElementById('root')
);

