import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user';
import recipeReducer from './recipe';
import recipesReducer from './recipes';

const rootReducer = combineReducers({
  user: userReducer,
  recipe: recipeReducer,
  recipes: recipesReducer,
});

export default rootReducer;
