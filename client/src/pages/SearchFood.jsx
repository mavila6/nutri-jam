import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

// import REACT_APP_API_KEY from ""

import { useMutation } from "@apollo/client";
import { SAVE_FOOD } from "../utils/mutations";
import Auth from "../utils/auth";
import { searchFoodApi } from "../utils/API";
import { saveFoodIds, getSavedFoodIds } from "../utils/localStorage";

// const SerpApi = require("google-search-results-nodejs");
// const search = new SerpApi.GoogleSearch(
//   "6aae3c12ac058815e5412d4c558836836b68960c22652694ca1320e7b5d10d83"
// );
const SearchFood = () => {
  const [searchedFood, setSearchedFood] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedFoodIds, setSavedFoodIds] = useState(getSavedFoodIds());
  const [foodSaved] = useMutation(SAVE_FOOD);

  useEffect(() => {
    return () => saveFoodIds(getSavedFoodIds);
  });

  // const search = new SerpApi.GoogleSearch("6aae3c12ac058815e5412d4c558836836b68960c22652694ca1320e7b5d10d83");
// const result = search.json({
//   q: "Coffee", 
//   location: "United States"
//  }, (result) => {
//    return result;
//  });
//  console.log(result)
//   fetch(
//     "https://serpapi.com/search.json?q=coffee&hl=en&gl=us&api_key=6aae3c12ac058815e5412d4c558836836b68960c22652694ca1320e7b5d10d83",
//     { mode: "no-cors" }
//   ).then(function (response) {
//     response.json().then(function (data) {
//       console.log(data);
//     });
//   });
  const handleSubmit = async (e) => {
    console.log("click");
    e.preventDefault();

      if(!searchInput) {
        return false
      }

    //     // if (!searchInput) {
    //     //   return false;
    //     // }
    try {
            const response = await searchFoodApi(searchInput);

            const {meals} = response;
            console.log(meals)
            const foodData = meals.map((meals) => ({
              idMeal:meals.idMeal,
              strMealThumb:meals.strMealThumb,
              strMeal:meals.strMeal,
              strIngredient1:meals.strIngredient1,
              strIngredient2: meals.strIngredient2,
              strIngredient3: meals.strIngredient3,
              strInstructions: meals.strInstructions,
              // strYoutube: meals.strYoutube
            }))
            // const foodData =meals.map((meals) => ({
              
            // }))
      //         // const response = await fetch ()
      //     // const response  = await fetch("https://cors-anywhere.serpapi.com/search.json?q=glutenfreebread&hl=en&gl=us&api_key=6aae3c12ac058815e5412d4c558836836b68960c22652694ca1320e7b5d10d83")

      //     ), async (req, res) => {
      //         // console.log(req.params.q)
      //         //   const response = await axios.get(
      //         //     `https://serpapi.com/search.json?q=${req.params.searchInput}&hl=en&gl=us&api_key=6aae3c12ac058815e5412d4c558836836b68960c22652694ca1320e7b5d10d83`
      //         //   );
      //         //   // console.log(response);
      //         //   const json = await response.json
      //         //   console.log(json)
      //         //   res.json(response.data.recipes_results );

      //         // const results = await searchFood(req.params.q, res);
      //         // console.log(results);
      //         // res.json(results);
      //       };
      // const response = await fetch(`/api/:q/${searchInput}`);

      // if (!response.ok) {
      //   throw new Error("Oops! You got an error.");
      // }
      // const { items } = await response.json();
      // const body = await response.body;
      // // const reader = body.getReader()
      // const foodData = items.map((food) => ({
      //   idMeal: idMeal,
      //   title: food.title,
      //   link: food.link,
      //   source: food.source,
      //   totalTime: food.totalTime,
      //   ingredients: food.ingredients,
      // }));

      setSearchedFood(foodData);
      // console.log(reader.read())
      setSearchInput("");
    } catch (err) {
      console.error("line 59", err);
    }
  };

  const handleSaveFood = async (idMeal) => {
    const foodToSave = searchedFood.find((food) => food.idMeal === idMeal);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await foodSaved({
        variables: { content: foodToSave },
      });
      setSavedFoodIds([...savedFoodIds, foodToSave.idMeal]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Recipes!</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a recipe"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
                {/* <Button onClick={handleSubmit} variant="success" size="lg">
                  Test!
                </Button> */}
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedFood.length
            ? `Viewing ${searchedFood.length} results:`
            : "Search for a recipe to begin"}
        </h2>
        <CardColumns>
          {searchedFood.map((food) => {
            return (
              <Card key={food.idMeal} border="dark">
                {food.strMealThumb ? (
                  <Card.Img
                    src={food.strMealThumb}
                    alt={`The link to ${food.strMeal}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{food.strMeal}</Card.Title>
                  <p className="small">Ingredients: {[food.strIngredient1, food.strIngredient2, food.strIngredient3]}</p>
                  {/* <p className="small">Ingredients: {[food.strIngredient1.join(' '), food.strIngredient2.join(' '), food.strIngredient3]}</p> */}
                  <Card.Text>{food.strInstructions}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedFoodIds?.some(
                        (savedFoodId) => savedFoodId === food.idMeal
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveFood(food.idMeal)}
                    >
                      {savedFoodIds?.some(
                        (savedFoodId) => savedFoodId === food.idMeal
                      )
                        ? "This recipe has already been saved!"
                        : "Save this Recipe!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
    //   ); Will be replaced with our Material UI code
  );
};

export default SearchFood;
