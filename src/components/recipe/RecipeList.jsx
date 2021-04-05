import React from 'react';

import RecipeItem from './RecipeItem';
import { RecipeCards } from '../../layouts/Recipes';
import { isNotArray } from '../../utils/utils';

const RecipeList = ({ recipesBook }) => {
  if (isNotArray(recipesBook)) {
    return (
      <div>Empty</div>
    );
  }

  return (
    <RecipeCards className="card-list">
      {(
        recipesBook.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))
      )}
    </RecipeCards>
  );
};

export default React.memo(RecipeList);
