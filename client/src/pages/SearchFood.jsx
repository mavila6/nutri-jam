import React, { useState, useEffect } from "react";
// import {
//   Jumbotron,
//   Container,
//   Col,
//   Form,
//   Button,
//   Card,
//   CardColumns,
// } from "react-bootstrap"; This will be changed to material ui

import { useMutation } from "@apollo/client";
import { SAVE_FOOD } from "../utils/mutations";
import Auth from "../utils/auth";
import {searchFood} from "../utils/API";
import { saveFoodIds, getSavedFoodIds} from "../utils/localStorage";

const SearchFood = () => {
  const [searchedFood, setSearchedFood] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedFoodIds, setSavedFoodIds] = useState(getSavedFoodIds());
  const [foodSave] = useMutation(SAVE_FOOD);

  useEffect(() => {
    return () => saveFoodIds(getSavedFoodIds);
  }); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchInput) {
      return false;
    }
    try {
      const response = await searchResult(searchInput);
      if (!response.ok) {
        throw new Error("Oops! You got an error.");
      }
      const { items } = await response.json();

      const savedFoodInput = items.map((food) => ({
        // foodId: lorem,
        // recipe: lorem,
        // userId:lorem,
        // description: lorem,
        // image: lorem  will place our response data here
      }));

      setSearchedFood(savedFoodInput);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveFood = async (foodId) => {
    const foodToSave = searchedFood.find((food) => food.foodId === foodId);

    const token = Auth.loggedIn() ?  Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await foodSave({
        variables: {content: foodToSave},
      });
      setSavedFoodIds([...savedFoodIds, foodToSave.foodId]);
    } catch (err) {
      console.error(err);
    }
  };

  // return (
  //   <>
  //     <Jumbotron fluid className="text-light bg-dark">
  //       <Container>
  //         <h1>Search for Books!</h1>
  //         <Form onSubmit={handleFormSubmit}>
  //           <Form.Row>
  //             <Col xs={12} md={8}>
  //               <Form.Control
  //                 name="searchInput"
  //                 value={searchInput}
  //                 onChange={(e) => setSearchInput(e.target.value)}
  //                 type="text"
  //                 size="lg"
  //                 placeholder="Search for a book"
  //               />
  //             </Col>
  //             <Col xs={12} md={4}>
  //               <Button type="submit" variant="success" size="lg">
  //                 Submit Search
  //               </Button>
  //             </Col>
  //           </Form.Row>
  //         </Form>
  //       </Container>
  //     </Jumbotron>

  //     <Container>
  //       <h2>
  //         {searchedBooks.length
  //           ? `Viewing ${searchedBooks.length} results:`
  //           : "Search for a book to begin"}
  //       </h2>
  //       <CardColumns>
  //         {searchedBooks.map((book) => {
  //           return (
  //             <Card key={book.bookId} border="dark">
  //               {book.image ? (
  //                 <Card.Img
  //                   src={book.image}
  //                   alt={`The cover for ${book.title}`}
  //                   variant="top"
  //                 />
  //               ) : null}
  //               <Card.Body>
  //                 <Card.Title>{book.title}</Card.Title>
  //                 <p className="small">Authors: {book.authors}</p>
  //                 <Card.Text>{book.description}</Card.Text>
  //                 {Auth.loggedIn() && (
  //                   <Button
  //                     disabled={savedBookIds?.some(
  //                       (savedBookId) => savedBookId === book.bookId
  //                     )}
  //                     className="btn-block btn-info"
  //                     onClick={() => handleSaveBook(book.bookId)}
  //                   >
  //                     {savedBookIds?.some(
  //                       (savedBookId) => savedBookId === book.bookId
  //                     )
  //                       ? "This book has already been saved!"
  //                       : "Save this Book!"}
  //                   </Button>
  //                 )}
  //               </Card.Body>
  //             </Card>
  //           );
  //         })}
  //       </CardColumns>
  //     </Container>
  //   </>
  // ); Will be replaced with our Material UI code
};

export default SearchFood;