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

import { useMutation } from "@apollo/client";
import { SAVE_FOOD } from "../utils/mutations";
import Auth from "../utils/auth";
import { searchFood } from "../utils/API";
import { saveFoodIds, getSavedFoodIds } from "../utils/localStorage";

const SearchFood = () => {
  const [searchedFood, setSearchedFood] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedFoodIds, setSavedFoodIds] = useState(getSavedFoodIds());
  const [foodSaved] = useMutation(SAVE_FOOD);

  useEffect(() => {
    return () => saveFoodIds(getSavedFoodIds);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchInput) {
      return false;
    }
    try {
      const response = await searchFood(searchInput);
      if (!response.ok) {
        throw new Error("Oops! You got an error.");
      }
      const { items } = await response.json();

      const foodData = items.map((food) => ({
        foodId: food.id,
        title: food.title,
        link: food.link,
        source: food.source,
        totalTime: food.totalTime,
        ingredients: food.ingredients,
      }));

      setSearchedFood(foodData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveFood = async (foodId) => {
    const foodToSave = searchedFood.find((food) => food.foodId === foodId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await foodSaved({
        variables: { content: foodToSave },
      });
      setSavedFoodIds([...savedFoodIds, foodToSave.foodId]);
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
              <Card key={food.foodId} border="dark">
                {food.image ? (
                  <Card.Img
                    src={food.link}
                    alt={`The link to ${food.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{food.title}</Card.Title>
                  <p className="small">Ingredients: {food.ingredients}</p>
                  <Card.Text>{food.source}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedFoodIds?.some(
                        (savedFoodId) => savedFoodId === food.foodId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveFood(food.foodId)}
                    >
                      {savedFoodIds?.some(
                        (savedFoodId) => savedFoodId === food.foodId
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
