/* eslint-disable func-names */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { render, waitFor } from '@testing-library/react';

import App from './App';
import allConditionsState from '../fixtures/allConditionsState';

jest.mock('react-redux');

window.IntersectionObserver = jest.fn(function () {
  this.observe = jest.fn();
  this.unobserve = jest.fn();
});

describe('App', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector(allConditionsState));
  });

  const renderApp = ({ path }) => {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    ));
  };

  context('with path /', () => {
    it('renders RecipesPage', async () => {
      const { container } = await waitFor(() => renderApp({ path: '/' }));

      expect(container).toHaveTextContent('마들렌');
    });
  });

  context('with path /recipe/:id', () => {
    it('renders RecipesPage', async () => {
      const { container } = await waitFor(() => renderApp({ path: '/recipe/1' }));

      expect(container).toHaveTextContent('마들렌');
    });
  });

  context('with path /recipewrite/:id', () => {
    it('renders RecipesPage', async () => {
      const { container } = await waitFor(() => renderApp({ path: '/recipewrite/1' }));

      expect(container).toHaveTextContent('해당 페이지를 찾을 수 없습니다.');
    });
  });

  context('with path /notExist', () => {
    it('renders Recipe404Page', async () => {
      const { container } = await waitFor(() => renderApp({ path: '/notExist' }));

      expect(container).toHaveTextContent('해당 페이지를 찾을 수 없습니다.');
    });
  });
});
