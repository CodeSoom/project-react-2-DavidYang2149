import { createSlice } from '@reduxjs/toolkit';

import {
  fetchRecipe,
  fetchCategories,
} from '../services/api';

const initialRecipeFields = {
  title: '',
  category: '쿠키',
  product: 0,
  bakingTemperature: '',
  bakingTime: '',
  ingredients: [],
  process: '',
};

const initialState = {
  categories: [],
  recipe: {
    ...initialRecipeFields,
  },
};

const { actions, reducer } = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setRecipe(state, { payload: recipe }) {
      return {
        ...state,
        recipe,
      };
    },

    setCategories(state, { payload: categories }) {
      return {
        ...state,
        categories,
      };
    },

    changeRecipeField(state, { payload: { name, value } }) {
      return {
        ...state,
        recipe: {
          ...state.recipe,
          [name]: value,
        },
      };
    },
  },
});

export const {
  setRecipe,
  setCategories,
  changeRecipeField,
} = actions;

export function loadRecipe() {
  return async (dispatch) => {
    const recipe = await fetchRecipe();
    dispatch(setRecipe(recipe));
  };
}

export function loadCategories() {
  return async (dispatch) => {
    const categories = await fetchCategories();
    dispatch(setCategories(categories));
  };
}

export default reducer;
