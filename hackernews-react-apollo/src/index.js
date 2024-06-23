import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/index.css';
import App from '../src/components/App.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AUTH_TOKEN } from './constants.js';

//订阅功能配置
import { split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';



//1
import {//引入依赖
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
//2  We create the httpLink that will connect our ApolloClient instance with the GraphQL API. 
//   The GraphQL server will be running on http://localhost:4000
const httpLink = createHttpLink({//配置请求连接
  uri: 'http://localhost:4000'
});


const wsLink = new WebSocketLink({//配置订阅请求的链接
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN)
    }
  }
});



//3
const authLink = setContext((_, { headers }) => {//配置请求头，在请求头上添加authorization用于身份验证
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

//使用split判断请求类型，并进行请求转发
//split有三个参数，第一个参数返回true和false，用于判断请求类型
//如果请求类型是订阅，则将将请求转发到第二个参数中设置的链接
//如果请求类型是普通的grqphql请求，则将请求转发到第三个参数中设置的链接
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' &&
      operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({//创建apollo连接
  link,
  cache: new InMemoryCache()
});
//4
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  {/* 使用ApolloProvider进行包裹 */}
    <ApolloProvider client={client}>  
      <App />
    </ApolloProvider>,
  </BrowserRouter>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
