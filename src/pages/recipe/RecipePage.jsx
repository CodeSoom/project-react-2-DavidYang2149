import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import RecipeContainer from '../../containers/recipe/RecipeContainer';
import { loadRecipe, clearRecipe } from '../../redux/recipe';

const RecipePage = ({ params }) => {
  const dispatch = useDispatch();
  const { id } = params || useParams();

  useEffect(() => {
    dispatch(clearRecipe());
    dispatch(loadRecipe(id));
  }, [id]);

  return (
    <RecipeContainer />
  );
};

export default RecipePage;
