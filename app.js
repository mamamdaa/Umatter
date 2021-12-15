const http = require('http');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors')
const app = express()
app.use(cors())
const hostname = '127.0.0.1';
const schema = require('./graphql/schemas/index');
const bodyParser = require('body-parser');
const isAuth = require('./middlewares/AuthMiddleware');
const { NotFound, ErrorHandler } = require("./middlewares/ErrorMiddleware");
dotenv.config();
connectDB();




app.use(bodyParser.json());
app.use(isAuth);

app.use('/graphql', graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
    context: {
        req,
        res
    },
  

})));
app.use(NotFound);
app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://${hostname}:${process.env.PORT}/`);
});