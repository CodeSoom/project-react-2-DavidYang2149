import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import mockRecipe from '../../fixtures/recipe';
import mockCategories from '../../fixtures/categories';

import RecipeDetailContainer from './RecipeDetailContainer';

describe('RecipeDetailContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      recipe: mockRecipe,
      categories: mockCategories,
    }));
  });

  it('renders page', () => {
    const { container } = render((
      <RecipeDetailContainer />
    ));

    expect(container).toHaveTextContent('Recipe');

    expect(container).toHaveTextContent('레시피명');
    expect(container).toHaveTextContent('카테고리');
    expect(container).toHaveTextContent('생산량');

    expect(container).toHaveTextContent('오븐 온도');
    expect(container).toHaveTextContent('굽는 시간');

    expect(container).toHaveTextContent('만드는 방법');
  });

  it('listens change events', () => {
    const { getByLabelText } = render((
      <RecipeDetailContainer />
    ));

    const controls = [
      { label: '레시피명', name: 'title', value: '초코마들렌' },
      { label: '만드는 방법', name: 'process', value: '정말 최고 :)' },
    ];

    controls.forEach(({ label, name, value }) => {
      fireEvent.change(getByLabelText(label), { target: { value } });

      expect(dispatch).toBeCalledWith({
        type: 'application/changeRecipeField',
        payload: { name, value },
      });
    });
  });
});
