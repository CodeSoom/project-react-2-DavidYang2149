import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import RecipeList from '../../recipe/RecipeList';
import allConditionsState from '../../../../fixtures/allConditionsState';

describe('RecipeList', () => {
  const renderRecipeList = (recipesBook) => render((
    <MemoryRouter>
      <RecipeList
        recipesBook={recipesBook}
      />
    </MemoryRouter>
  ));

  context('with recipesBook', () => {
    it('render values', () => {
      const { container } = renderRecipeList(allConditionsState.recipes.recipesBook);

      expect(container).toHaveTextContent('마들렌');
    });
  });

  context('without recipesBook', () => {
    it('render nothing', () => {
      const { container } = renderRecipeList();

      expect(container).toHaveTextContent('Empty');
    });
  });
});
