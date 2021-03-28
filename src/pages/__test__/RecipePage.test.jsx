import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { render } from '@testing-library/react';

import allConditionsState from '../../../fixtures/allConditionsState';
import RecipePage from '../RecipePage';

jest.mock('react-redux');

describe('RecipePage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector(allConditionsState));
  });

  it('render Page', () => {
    const { container } = render((
      <MemoryRouter>
        <RecipePage />
      </MemoryRouter>
    ));

    expect(container).toHaveTextContent('레시피명');
  });

  context('with params props', () => {
    it('renders name', () => {
      const params = { id: 1 };

      const { container } = render(
        <RecipePage params={params} />,
      );

      expect(container).toHaveTextContent('마들렌');
    });
  });

  context('without params props', () => {
    it('renders name', () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/recipe/1']}>
          <RecipePage />
        </MemoryRouter>,
      );

      expect(container).toHaveTextContent('마들렌');
    });
  });
});
