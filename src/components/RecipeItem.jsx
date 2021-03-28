import React from 'react';
import { Link } from 'react-router-dom';

import { RecipeCard } from '../layouts/Recipes';
import { isEmpty } from '../utils/utils';

const RecipeItem = ({ recipe }) => {
  if (isEmpty(recipe)) {
    return false;
  }

  return (
    <RecipeCard>
      <Link to={`/recipe/${recipe.id}`}>
        <figure className="card-image" style={{ backgroundImage: `url(${recipe.image || 'images/cookie.jpeg'})` }}>
          <img src={recipe.image || 'images/cookie.jpeg'} alt="recipe" />
        </figure>
        <div className="card-desc">
          <h1>{recipe.title}</h1>
          <p>{recipe.description.length > 30 ? `${recipe.description.substring(0, 30)}...` : recipe.description}</p>
          <p className="card-created">{recipe.created.substr(0, 10)}</p>
          <p>
            by
            {' '}
            <strong>{recipe.userId.split('@')[0]}</strong>
          </p>
        </div>
      </Link>
    </RecipeCard>
  );
};

export default RecipeItem;
