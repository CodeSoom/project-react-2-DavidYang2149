import { createSlice } from '@reduxjs/toolkit';

import { fetchRecipes } from '../services/recipes';
import {
  isEmpty,
  formatRecipe,
  RECIPE_COUNT,
} from '../utils/utils';

const initialState = {
  recipesBook: [],
  lastRecipe: { recipe: null, isLast: false },
};

const { actions, reducer } = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes(state, { payload }) {
      return {
        ...state,
        recipesBook: [...payload],
      };
    },
    setLastRecipe(state, { payload: { name, value } }) {
      return {
        ...state,
        lastRecipe: { ...state.lastRecipe, [name]: value },
      };
    },
    addRecipes(state, { payload }) {
      return {
        ...state,
        recipesBook: [...state.recipesBook, ...payload],
      };
    },
  },
});

export function loadRecipes() {
  return async (dispatch, getState) => {
    const {
      recipes: {
        lastRecipe: { recipe, isLast },
      },
    } = getState();

    if (isLast) { return; }

    const response = await fetchRecipes(recipe);

    if (isEmpty(response)) {
      dispatch(actions.setRecipes(initialState));
      return;
    }

    const recipes = response.map((doc) => formatRecipe(doc));
    dispatch(actions.addRecipes(recipes));
    dispatch(actions.setLastRecipe({ name: 'recipe', value: recipes[recipes.length - 1] }));
    dispatch(actions.setLastRecipe({ name: 'isLast', value: false }));

    if (recipes.length < RECIPE_COUNT) {
      dispatch(actions.setLastRecipe({ name: 'isLast', value: true }));
    }
  };
}

export function updateRecipes() {
  return async (dispatch) => {
    const response = await fetchRecipes();
    const recipes = response.map((doc) => formatRecipe(doc));
    dispatch(actions.setRecipes(recipes));
    dispatch(actions.setLastRecipe({ name: 'recipe', value: recipes[recipes.length - 1] }));
    dispatch(actions.setLastRecipe({ name: 'isLast', value: false }));
  };
}

export const {
  setRecipes,
  setLastRecipe,
  addRecipes,
} = actions;

export default reducer;
