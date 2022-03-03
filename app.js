const http = require("http");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const app = express();
app.use(cors());
const hostname = "localhost";
const schema = require("./graphql/schemas/index");
const bodyParser = require("body-parser");
const isAuth = require("./middlewares/AuthMiddleware");
const { NotFound, ErrorHandler } = require("./middlewares/ErrorMiddleware");
dotenv.config();
connectDB();
const { ApolloServer, gql } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
OAuth2_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const access_token = OAuth2_client.getAccessToken((err, token) => {
  if (err) {
    console.log(err);
  } else {
    console.log("token", token);
  }
});

var path = require("path");

const httpServer = http.createServer(app);

const pubsub = new PubSub();

// app.get("/confirmation/:token", (req, res) => {
//   const access_token = OAuth2_client.getAccessToken((err, token) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("token", token);
//     }
//   });

//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       type: "OAuth2",
//       user: process.env.EMAIL,
//       clientId: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       refreshToken: process.env.REFRESH_TOKEN,
//       accessToken: access_token,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: "mysuniah@gmail.com",
//     subject: "Hello ✔",
//     html: "<b>Hello world?</b>",
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//     transporter.close();
//   });
// });

app.use(isAuth);
const server = new ApolloServer({
  schema,
  graphiql: true,
  context: ({ req, res }) => ({ req, pubsub, res, access_token}),
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    },
  ],
  engine: {
    reportSchema: true,
  },
});

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
    onConnect: async (connectionParams, webSocket) => {
      return { pubsub };
    },
  },
  {
    server: httpServer,
    path: "/graphql",
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
  });
}

// const PORT = 4000;
//   httpServer.listen(PORT, () =>
//     console.log(`httpServer is now running on http://localhost:${PORT}/graphql`)
//   );

// server.installSubscriptionHandlers(httpServer)

server.start().then((res) => {
  server.applyMiddleware({ app });
  httpServer.listen(process.env.PORT, () => {
    console.log(`Server running at http://${hostname}:${process.env.PORT}/`);
  });
});
