const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;

// add async function
const startApollo = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  await server.start();
  await server.applyMiddleware({ app });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //client/build static
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(_dirname, "../client/build")));
  }

  app.use(routes);

  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
  });
};
startApollo();
