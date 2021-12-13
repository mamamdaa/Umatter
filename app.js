const http = require('http');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const app = express()
const hostname = '127.0.0.1';
const port = 5000;
const schema = require('./graphql/schemas/index');
dotenv.config();
connectDB();

       
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});