import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import RecipeItem from '../RecipeItem';
import allConditionsState from '../../../fixtures/allConditionsState';

describe('RecipeItem', () => {
  const renderRecipeItem = (recipe) => render((
    <MemoryRouter>
      <RecipeItem
        recipe={recipe}
      />
    </MemoryRouter>
  ));

  context('with recipe', () => {
    it('render values', () => {
      const { container } = renderRecipeItem(allConditionsState.recipes.recipesBook[0]);

      expect(container).toHaveTextContent('마들렌');
    });
  });

  context('without recipe', () => {
    it('render nothing', () => {
      const { container } = renderRecipeItem();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
