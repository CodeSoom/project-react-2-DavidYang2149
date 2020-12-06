import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import mockRecipe from '../../fixtures/recipe';

import RecipeIngredientsContainer from './RecipeIngredientsContainer';

describe('RecipeIngredientsContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      recipe: mockRecipe,
    }));
  });

  it('renders page', () => {
    const { container } = render((
      <RecipeIngredientsContainer />
    ));

    expect(container).toHaveTextContent('Ingredients');

    expect(container).toHaveTextContent('재료');
    expect(container).toHaveTextContent('용량');

    expect(container).toHaveTextContent('재료 추가하기');
  });
});
