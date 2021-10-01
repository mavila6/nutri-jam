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
import {searchResult} from "../utils/API";
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


}