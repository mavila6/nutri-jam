import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "..";

const mockToggleHeader = jest.fn();
const currentRecipe = {
  title: "Caldo de Queso",
  link: "caldos.com",
  source: "Mi Abuela",
  totalTime: 2,
  ingredients: ["papas, queso, caldo, pablanos"],
};

afterEach(cleanup);

describe("Header component", () => {
  //renders Header test
  // First Test
  it("renders", () => {
    render(<Header onClose={mockToggleHeader} currentRecipe={currentRecipe} />);
  });
});
