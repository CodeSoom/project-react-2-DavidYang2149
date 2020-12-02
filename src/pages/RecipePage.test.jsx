import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import mockRecipe from '../../fixtures/recipe';
import mockCategories from '../../fixtures/categories';

import RecipePage from './RecipePage';

describe('RecipePage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      recipe: mockRecipe,
      categories: mockCategories,
    }));
  });

  function renderRecipePage() {
    return render((
      <RecipePage />
    ));
  }

  it('renders recipe page', () => {
    renderRecipePage();
  });

  it('renders ', () => {
    const { container } = renderRecipePage();

    // expect(dispatch).toBeCalled();

    expect(container).toHaveTextContent('마들렌');
    expect(container).toHaveTextContent('마들렌 만드는 방법');
  });
});
