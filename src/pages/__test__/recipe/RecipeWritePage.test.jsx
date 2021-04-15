import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { render } from '@testing-library/react';

import allConditionsState from '../../../../fixtures/allConditionsState';
import RecipeWritePage from '../../recipe/RecipeWritePage';

jest.mock('react-redux');

describe('RecipeWritePage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      ...allConditionsState,
      user: {
        userId: '1',
        displayName: '',
      },
    }));
  });

  it('render Page', () => {
    const { container } = render((
      <MemoryRouter>
        <RecipeWritePage />
      </MemoryRouter>
    ));

    expect(container).toHaveTextContent('레시피명');
  });

  context('with params props', () => {
    it('renders name', () => {
      const params = { id: 1 };

      const { container } = render(
        <RecipeWritePage params={params} />,
      );

      expect(container).toHaveTextContent('마들렌');
    });
  });

  context('without params props', () => {
    it('renders name', () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/recipewrite/1']}>
          <RecipeWritePage />
        </MemoryRouter>,
      );

      expect(container).toHaveTextContent('마들렌');
    });
  });
});
