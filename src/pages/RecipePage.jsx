import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from '../components/common/Button';

import Container from '../layouts/Container';

import RecipeIngredientsContainer from '../containers/RecipeIngredientsContainer';
import RecipeDetailContainer from '../containers/RecipeDetailContainer';

import {
  loadRecipe,
  loadCategories,
} from '../store/slice';

import { get } from '../utils/utils';

export default function RecipePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRecipe());
    dispatch(loadCategories());
  });

  const recipe = useSelector(get('recipe'));
  const categories = useSelector(get('categories'));
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
        categories={categories}
      />

      <RecipeIngredientsContainer ingredients={ingredients} />

      <div className="flex items-center flex-100 mt-8">
        <hr className="border-t-2 flex-auto" />
      </div>

    </Container>
  );
}
