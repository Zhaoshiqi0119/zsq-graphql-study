//引入react核心库
import React from 'react'
//引入ReactDOM
import ReactDOM from 'react-dom'
//引入App
import App from './App'
//引入router
import { BrowserRouter } from 'react-router-dom'

// 1
import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// 2
const httpLink = createHttpLink({
    uri: 'http://localhost:9999/graphql',
    credentials: 'include' // 确保请求带上 cookies
});

// 3
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
)