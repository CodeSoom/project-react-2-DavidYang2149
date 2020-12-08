import mockRecipe from '../../fixtures/recipe';
import mockCategories from '../../fixtures/categories';

import { saveItem, loadItem } from './storage';

export async function fetchRecipe() {
  const data = loadItem('recipe') || mockRecipe;
  return data;
}

export async function fetchCategories() {
  const data = mockCategories;
  return data;
}

export async function postRecipe({ recipe }) {
  const data = saveItem('recipe', JSON.stringify({ recipe }));
  return data;
}
