import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user';
import recipeReducer from './recipe';
import recipesReducer from './recipes';
import chatReducer from './chat';

const rootReducer = combineReducers({
  user: userReducer,
  recipe: recipeReducer,
  recipes: recipesReducer,
  chat: chatReducer,
});

export default rootReducer;
