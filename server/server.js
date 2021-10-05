const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const db = require("./config/connection");
// const axios = require("axios");
const REACT_APP_API_KEY = require("dotenv")

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");


const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
const cors = require("cors");

// const SerpApi = require("google-search-results-nodejs");

// const apiKey = REACT_APP_API_KEY


// integrate our Apollo server with the Express application as middleware
server.applyMiddleware({ app });
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// const search = new SerpApi.GoogleSearch("6aae3c12ac058815e5412d4c558836836b68960c22652694ca1320e7b5d10d83");
// search.json({
//   q: "Coffee", 
//   location: "United States"
//  }, (result) => {
//    console.log(result)
//  })
// const searchFood = (query) => {
//   const search = new SerpApi.GoogleSearch("6aae3c12ac058815e5412d4c558836836b68960c22652694ca1320e7b5d10d83");
//   console.log(query, "line 34")

//   const params = {
//     q: {query} ,
//     engine: "google",
//     location: "United States",
//     hl: "en",
//     gl: "us",
//   }
  
//   console.log(params);

//   const callback = function (data) {
//     console.log(data.recipes_results)
//     return data.recipes_results;
//   };

  // Show result!
//   search.json(params, callback);
// };

app.get("/api/results/:q", async (req, res) => {
  console.log(req.recipes_results, "line 68")
  //   const response = await axios.get(
  //     `https://serpapi.com/search.json?q=${req.params.searchInput}&hl=en&gl=us&api_key=6aae3c12ac058815e5412d4c558836836b68960c22652694ca1320e7b5d10d83`
  //   );
  //   // console.log(response);
  //   const json = await response.json
  //   console.log(json)
  //   res.json(response.data.recipes_results );

  // const results = await searchFood(req.params.q, res);
  // console.log(results);
  // res.json(results);
});
/* if we make a GET request to any location on the server that doesn't have an explicit route defined,
respond with the production-ready React front-end code. */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

// module.exports = searchFood