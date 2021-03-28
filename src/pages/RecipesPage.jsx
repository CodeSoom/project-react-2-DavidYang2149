import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { loadRecipes } from '../redux/recipes';
import RecipesContainer from '../containers/RecipesContainer';
import UseInfiniteScroll from '../components/UseInfiniteScroll';

const RecipesPage = () => {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);

  UseInfiniteScroll({
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
