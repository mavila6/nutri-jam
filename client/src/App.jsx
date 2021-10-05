import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import ThemeContext from "./context/ThemeContext/ThemeContext"
// import RecipeProvider from "./context/RecipeContext/RecipeProvider"
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import SearchFood from "./pages/SearchFood";
// import SavedFood from "./pages/SavedFood";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";

require("dotenv").config();

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // const context = useContext(ThemeContext)
  return (
    <ApolloProvider client={client}>
      <Router>
        {/* <RecipeProvider> */}
          <Header />
          <Switch>
            <Route exact path="/" component={SearchFood} />
            {/* <Route exact path="/saved" component={SavedFood} /> */}
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        {/* </RecipeProvider> */}
      </Router>
    </ApolloProvider>
  );
}

export default App;
