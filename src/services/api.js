import mockRecipe from '../../fixtures/recipe';
import mockCategories from '../../fixtures/categories';

export async function fetchRecipe() {
  const data = mockRecipe;
  return data;
}

export async function fetchCategories() {
  const data = mockCategories;
  return data;
}
