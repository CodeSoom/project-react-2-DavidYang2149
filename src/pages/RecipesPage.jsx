import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { loadRecipes } from '../redux/recipes';
import RecipesContainer from '../containers/recipe/RecipesContainer';
import InfiniteScroll from '../components/common/InfiniteScroll';

const RecipesPage = () => {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);

  InfiniteScroll({
    target,
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting) {
        dispatch(loadRecipes());
      }
    },
  });

  return (
    <>
      <RecipesContainer />
      <div ref={setTarget} />
    </>
  );
};

export default RecipesPage;
