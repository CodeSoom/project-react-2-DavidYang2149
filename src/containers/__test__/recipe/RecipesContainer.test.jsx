import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';

import allConditionsState from '../../../../fixtures/allConditionsState';
import RecipesContainer from '../../recipe/RecipesContainer';

jest.mock('react-redux');
jest.mock('../../../services/recipes');

describe('RecipesContainer', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      ...allConditionsState,
    }));
  });

  context('with recipes', () => {
    it('renders container', () => {
      render((
        <MemoryRouter>
          <RecipesContainer />
        </MemoryRouter>
      ));
    });
  });

  context('without recipes', () => {
    it('render loading', () => {
      useSelector.mockImplementation((selector) => selector({
        recipes: { recipesBook: [] },
      }));

      render((
        <MemoryRouter>
          <RecipesContainer />
        </MemoryRouter>
      ));
    });
  });
});
