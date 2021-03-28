import { createSlice } from '@reduxjs/toolkit';

import {
  fetchRecipe,
  postRecipe,
  updateRecipe,
  deleteRecipe,
  postFile,
  deleteFile,
} from '../services/recipes';
import {
  isEmpty,
  isNotEmpty,
  formatRecipe,
} from '../utils/utils';

const initialState = {
  id: 0,
  userId: '',
  title: '',
  category: 0,
  product: 0,
  ingredients: [],
  newIngredient: { id: 0, ingredient: '', weight: 0 },
  description: '',
  upload: null,
  image: null,
};

const { actions, reducer } = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    setRecipe(state, { payload }) {
      return {
        ...state,
        ...payload,
        newIngredient: { id: payload.ingredients.length + 1, ingredient: '', weight: 0 },
      };
    },
    setNewIngredient(state, { payload: { fields } }) {
      return {
        ...state,
        ingredients: [fields, ...state.ingredients],
        newIngredient: { id: 0, ingredient: '', weight: 0 },
      };
    },
    changeRecipe(state, { payload: { name, value } }) {
      return {
        ...state,
        [name]: value,
      };
    },
    changeIngredient(state, { payload: { name, value } }) {
      const [targetName, targetId] = name.split('-');
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          return parseInt(ingredient.id, 10) === parseInt(targetId, 10)
            ? { ...ingredient, [targetName]: value }
            : ingredient;
        }),
      };
    },
    changeNewIngredient(state, { payload: { name, value } }) {
      const [targetName, targetId] = name.split('-');
      return {
        ...state,
        newIngredient: { ...state.newIngredient, id: parseInt(targetId, 10), [targetName]: value },
      };
    },
    clearRecipe(state) {
      return {
        ...state,
        ...initialState,
      };
    },
    removeIngredient(state, { payload: { value } }) {
      const length = state.ingredients.length - 1;
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient) => {
          return parseInt(ingredient.id, 10) !== parseInt(value, 10);
        }).map((obj, index) => {
          return { id: length - index, ingredient: obj.ingredient, weight: obj.weight };
        }),
        newIngredient: { ...state.newIngredient, id: parseInt(length + 1, 10) },
      };
    },
    swapIngredients(state, { payload: { originIndex, destinationIndex } }) {
      const ingredients = [...state.ingredients];
      const originIngredient = ingredients[originIndex];

      ingredients.splice(originIndex, 1);
      ingredients.splice(destinationIndex, 0, originIngredient);

      const { length } = ingredients;
      return {
        ...state,
        ingredients: ingredients.map((obj, index) => {
          return { ...obj, id: length - index };
        }),
      };
    },
  },
});

export function loadRecipe(id) {
  return async (dispatch) => {
    const recipe = await fetchRecipe(id);

    if (!recipe.exists) {
      dispatch(actions.setRecipe(initialState));
      return;
    }

    dispatch(actions.setRecipe(formatRecipe(recipe)));
  };
}

export function writeRecipe() {
  return async (dispatch, getState) => {
    const {
      user: { userId },
      recipe: {
        id, title, category, product, ingredients, description, upload, image,
      },
    } = getState();

    if (isEmpty(userId)) {
      return;
    }

    // Image upload Check
    let imageURL = '';

    // Replace Image
    if (isNotEmpty(upload) && isNotEmpty(image)) {
      await deleteFile({ image });
      imageURL = await postFile({ userId, upload });
    }

    // Create Image
    if (isNotEmpty(upload) && isEmpty(image)) {
      imageURL = await postFile({ userId, upload });
    }

    // Create
    if (isEmpty(id)) {
      const recipeInfo = {
        userId, title, category, product, ingredients, description, image: imageURL || image,
      };

      const createId = await postRecipe(recipeInfo);
      await dispatch(actions.changeRecipe({ name: 'id', value: createId }));
      return;
    }

    // Update
    const recipeInfo = {
      id, title, category, product, ingredients, description, image: imageURL || image,
    };
    await updateRecipe(recipeInfo);
    await dispatch(loadRecipe(id));
  };
}

export function removeRecipe() {
  return async (dispatch, getState) => {
    const { recipe } = getState();
    const { id, userId } = recipe;

    await deleteRecipe({ id, userId });
    dispatch(actions.clearRecipe());
  };
}

export function removeFile() {
  return async (dispatch, getState) => {
    const { recipe: { image } } = getState();

    await deleteFile({ image });
    dispatch(actions.changeRecipe({ name: 'image', value: null }));
  };
}

export const {
  setRecipe,
  setNewIngredient,
  changeRecipe,
  changeIngredient,
  changeNewIngredient,
  clearRecipe,
  removeIngredient,
  swapIngredients,
} = actions;

export default reducer;
