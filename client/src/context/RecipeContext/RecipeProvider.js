// import React, { Component } from "react";
// import FoodContext from "./FoodContext"

// class RecipeProvider extends Component {
//     constructor(props) {
//         super(props) 
//             this.updateRecipes = this.updateRecipes.bind(this)
//             this.updateLoading = this.updateLoading.bind(this)

//             this.state = {
//                 recipes: null,
//                 isLoading: false,
//                 updateLoading: this.updateLoading,
//                 updateRecipes: this.updateRecipes
//             }
//         }


//         updateRecipes(val) {
//             this.setState(val)
//         }

//         updateLoading(val) {
//             this.setState({ isLoading:val})
//         }

//         render() {
//             return (
//                 <FoodContext.Provider value={this.state}>
//                     {this.props.children}
//                 </FoodContext.Provider>
//             )
//         }
//     }
// export default RecipeProvider
