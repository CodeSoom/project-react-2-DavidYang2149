import React from 'react';

import mockRecipe from '../../fixtures/recipe';
import mockCategories from '../../fixtures/categories';

import Button from '../components/common/Button';

import Container from '../layouts/Container';
import RecipeIngredientsContainer from '../containers/RecipeIngredientsContainer';
import RecipeDetailContainer from '../containers/RecipeDetailContainer';

export default function RecipePage({ recipe = mockRecipe }) {
  const { ingredients } = recipe;

  return (
    <Container>
      <div className="flex-100">
        <h1 className="font-bold text-3xl flex-100 mb-8">Oh My Baking Recipe</h1>
      </div>

      <div className="flex justify-between flex-100">
        <Button
          buttonClass="bg-blue-button text-white relative px-20 py-4 rounded"
          message="레시피 정보 저장하기"
        />
      </div>

      <RecipeDetailContainer
        recipe={recipe}
        categories={mockCategories}
      />

      <RecipeIngredientsContainer ingredients={ingredients} />

      <div className="flex items-center flex-100 mt-8">
        <hr className="border-t-2 flex-auto" />
      </div>

    </Container>
  );
}
