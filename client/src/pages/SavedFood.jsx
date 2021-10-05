// import React from "react";
// import {
//   Jumbotron,
//   Container,
//   CardColumns,
//   Card,
//   Button,
// } from "react-bootstrap";
// import { useQuery, useMutation } from "@apollo/client";
// import { GET_ME } from "../utils/queries";
// import { REMOVE_FOOD } from "../utils/mutations";
// import Auth from "../utils/auth";
// import { removeFoodId } from "../utils/localStorage";

// const SavedFood = () => {
//   const { loading, error, data } = useQuery(GET_ME);
//   const [removeFood] = useMutation(REMOVE_FOOD);

//   if (loading) return "LOADING...";
//   if (error) return `Error! ${error.message}`;

//   const userData = data?.me;

//   const handleDeleteFood = async (idMeal) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const { data } = await removeFood({
//         variables: { idMeal: idMeal },
//       });

//       removeFoodId(idMeal);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   //   return (
//   //     <>
//   //       <Jumbotron fluid className="text-light bg-dark">
//   //         <Container>
//   //           <h1>Viewing saved books!</h1>
//   //         </Container>
//   //       </Jumbotron>
//   //       <Container>
//   //         <h2>
//   //           {userData.savedBooks.length
//   //             ? `Viewing ${userData.savedBooks.length} saved ${
//   //                 userData.savedBooks.length === 1 ? "book" : "books"
//   //               }:`
//   //             : "You have no saved books!"}
//   //         </h2>
//   //         <CardColumns>
//   //           {userData.savedBooks.map((book) => {
//   //             return (
//   //               <Card key={book.bookId} border="dark">
//   //                 {book.image ? (
//   //                   <Card.Img
//   //                     src={book.image}
//   //                     alt={`The cover for ${book.title}`}
//   //                     variant="top"
//   //                   />
//   //                 ) : null}
//   //                 <Card.Body>
//   //                   <Card.Title>{book.title}</Card.Title>
//   //                   <p className="small">Authors: {book.authors}</p>
//   //                   <Card.Text>{book.description}</Card.Text>
//   //                   <Button
//   //                     className="btn-block btn-danger"
//   //                     onClick={() => handleDeleteBook(book.bookId)}
//   //                   >
//   //                     Delete this Book!
//   //                   </Button>
//   //                 </Card.Body>
//   //               </Card>
//   //             );
//   //           })}
//   //         </CardColumns>
//   //       </Container>
//   //     </>
//   //   );
// };

// export default SavedFood;
