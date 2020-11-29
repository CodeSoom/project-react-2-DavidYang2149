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

  it('renders page', () => {
    renderRecipePage();
  });

  it('renders region and category select buttons', () => {
    const { queryByText } = renderRecipePage();

    expect(dispatch).toBeCalled();

    expect(queryByText('마들렌')).not.toBeNull();
    expect(queryByText('마들렌 만드는 방법')).not.toBeNull();
  });
});
