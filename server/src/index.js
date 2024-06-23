const { ApolloServer, PubSub } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Vote = require('./resolvers/Vote');
const fs = require('fs');
const path = require('path');
const { getUserId } = require('./utils');

const pubsub = new PubSub();

const prisma = new PrismaClient({
  errorFormat: 'minimal'
});

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
};

const server = new ApolloServer({
  //typePaths是用来配置“架构优先方法”的
  //autoSchemaFile  这个是用来配置“代码优先方法的”
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  // playground:false,//禁用playground，就是那个粉色红图标，且可以写graphQL语句的页面,
  playground:true,//开启playground，就是那个粉色红图标，且可以写graphQL语句的页面,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,//这里把prisma放到context中，后面处理请求的时候，可以从上下文中拿出prisma来操作数据库
      pubsub,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  },
  subscriptions: {
    onConnect: (connectionParams) => {
      if (connectionParams.authToken) {
        return {
          prisma,
          userId: getUserId(
            null,
            connectionParams.authToken
          )
        };
      } else {
        return {
          prisma
        };
      }
    }
  }
});

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
