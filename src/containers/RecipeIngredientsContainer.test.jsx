import React from 'react';

import { render } from '@testing-library/react';

import RecipeIngredientsContainer from './RecipeIngredientsContainer';

import mockRecipe from '../../fixtures/recipe';

describe('RecipeIngredientsContainer', () => {
  const { ingredients } = mockRecipe;
  it('renders page', () => {
    const { container } = render((
      <RecipeIngredientsContainer ingredients={ingredients} />
    ));

    expect(container).toHaveTextContent('Ingredients');

    expect(container).toHaveTextContent('재료');
    expect(container).toHaveTextContent('용량');

    expect(container).toHaveTextContent('재료 추가하기');
  });
});
