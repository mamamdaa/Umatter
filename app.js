const http = require('http');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors')
const app = express()
app.use(cors())
const hostname = '127.0.0.1';
const port = 5000;
const schema = require('./graphql/schemas/index');
const bodyParser = require('body-parser');
const isAuth = require('./middlewares/AuthMiddleware');
const { NotFound, ErrorHandler } = require("./middlewares/ErrorMiddleware");
dotenv.config();
connectDB();
const { ApolloServer, gql} = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute,
  subscribe,} = require('graphql');

const httpServer = http.createServer(app);

const pubsub = new PubSub();


app.use(isAuth);
const server = new ApolloServer({ 
  schema,
  graphiql: true,
  context: ({ req,res }) => ({ req, pubsub,res }),
  plugins: [{
    async serverWillStart() {
      return {
        async drainServer() {
          subscriptionServer.close();
        }
      };
    }
  }],
    
});

const subscriptionServer = SubscriptionServer.create({
  schema,
  execute,
  subscribe,
  onConnect: async (connectionParams, webSocket) => {
    return { pubsub };
  },
}, {
  server: httpServer,
  path: '/graphql',
});

const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`httpServer is now running on http://localhost:${PORT}/graphql`)
  );


server.start().then(res => {
 const newServer =  server.applyMiddleware({ app });
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://${hostname}:${process.env.PORT}/`);
  });
});
