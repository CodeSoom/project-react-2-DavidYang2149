import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import RecipeWriteContainer from '../containers/recipe/RecipeWriteContainer';
import { loadRecipe, clearRecipe } from '../redux/recipe';

const RecipeWritePage = ({ params }) => {
  const dispatch = useDispatch();
  const { id } = params || useParams();

  useEffect(() => {
    dispatch(clearRecipe());
    dispatch(loadRecipe(id));
  }, [id]);

  return (
    <RecipeWriteContainer />
  );
};

export default RecipeWritePage;
