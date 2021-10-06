const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");

const schema = require("./schema");

// Constants
const URL =
  "mongodb+srv://musthafa:lea@cluster0.x8qeo.mongodb.net/musthafa?retryWrites=true&w=majority";

// Connect to MongoDB.
const connect = mongoose.connect(URL, { useNewUrlParser: true });
connect.then(
  (db) => {
    console.log("Connected correctly to server!");
  },
  (err) => {
    console.log(err);
  }
);

// Creating apollo server.
const server = new ApolloServer({
  schema: schema,
});

// Creating express app.
const app = express();

// Applying middelware to application.
app.use(bodyParser.json());
app.use("*", cors());

// Connecting express app with apollo.
server.applyMiddleware({ app });

// Start Server.
app.listen({ port: 4200 }, () =>
  console.log(`🚀 Server ready at http://localhost:4200${server.graphqlPath}`)
);
