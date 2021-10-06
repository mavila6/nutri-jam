import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_FOOD } from "../utils/mutations";
import Auth from "../utils/auth";
import { removeFoodId } from "../utils/localStorage";

const SavedFood = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [removeFood] = useMutation(REMOVE_FOOD);

  if (loading) return "LOADING...";
  if (error) return `Error! ${error.message}`;

  const userData = data?.me;

  const handleDeleteFood = async (idMeal) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeFood({
        variables: { idMeal: idMeal },
      });
      console.log(data)

      removeFoodId(idMeal);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved foooods!!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedFood.length
            ? `Viewing ${userData.savedFood.length} saved ${
                userData.savedFood.length === 1 ? "food" : "foods"
              }:`
            : "You have no saved foods!"}
        </h2>
        <CardColumns>
          {userData.savedFood.map((food) => {
            return (
              <Card key={food.idMeal} border="dark">
                {food.strMealThumb ? (
                  <Card.Img
                    src={food.strMealThumb}
                    alt={`The cover for ${food.strMeal}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{food.strMeal}</Card.Title>
                  <p className="small">
                      Ingredients:{" "}
                    {[
                      food.strIngredient1,
                      food.strIngredient2,
                      food.strIngredient3,
                    ]}
                    </p>
                  <Card.Text>{food.strInstructions}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteFood(food.idMeal)}
                  >
                    Delete the foooodss!!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedFood;
