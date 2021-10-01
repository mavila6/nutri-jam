import React from "react";
// import { Link } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";
// import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import "@testing-library/jest-dom/extend-expect";
import AppNavBar from "..";

// const mockToggleHeader = jest.fn();
// const currentRecipe = {
//   title: "Caldo de Queso",
//   link: "caldos.com",
//   source: "Mi Abuela",
//   totalTime: 2,
//   ingredients: ["papas, queso, caldo, pablanos"],
// };

afterEach(cleanup);

describe("Header component", () => {
  //renders Header test
  // First Test
  it("renders", () => {
    render(<AppNavBar />);
  });
});

//   it("matches snapshot DOM node structure", () => {
//     const { asFragment } = render(
//       <Header onClose={mockToggleHeader} currentRecipe={currentRecipe} />
//     );
//     expect(asFragment()).toMatchSnapshot();
//   });
// });

// describe("Click Event", () => {
//   it("calls onClose handler", () => {
//     const { getByText } = render(
//       <Modal onClose={mockToggleHeader} currentRecipe={currentRecipe} />
//     );
//     fireEvent.click(getByText("Close this Header"));
//     expect(mockToggleHeader).toHaveBeenCalledTimes(1);
//   });
// })
