import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import RecipeContainer from '../RecipeContainer';
import recipes from '../../../fixtures/recipes';
import allConditionsState from '../../../fixtures/allConditionsState';

const mockPush = jest.fn();

jest.mock('react-redux');
jest.mock('../../services/recipes');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('RecipeContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      ...allConditionsState,
      recipe: recipes[0],
      user: {
        userId: '1',
        displayName: '',
      },
    }));
  });

  describe('with recipe', () => {
    it('renders container', () => {
      render((
        <MemoryRouter>
          <RecipeContainer />
        </MemoryRouter>
      ));
    });

    context('without recipe', () => {
      it('renders container', () => {
        useSelector.mockImplementation((selector) => selector({
          ...allConditionsState,
          recipe: {
            id: null,
          },
          user: {
            userId: '1',
            displayName: '',
          },
        }));

        render((
          <MemoryRouter>
            <RecipeContainer />
          </MemoryRouter>
        ));
      });
    });

    context('with exist recipe', () => {
      useSelector.mockImplementation((selector) => selector({
        ...allConditionsState,
        recipe: recipes[0],
      }));

      it('click onSubmit', () => {
        const { getByText } = render((
          <MemoryRouter>
            <RecipeContainer />
          </MemoryRouter>
        ));

        fireEvent.click(getByText('수정하기'));

        expect(dispatch).toBeCalledTimes(0);
      });
    });

    context('with confirm true', () => {
      it('click onRemove', () => {
        global.confirm = () => true;
        const { getByText } = render((
          <MemoryRouter>
            <RecipeContainer />
          </MemoryRouter>
        ));

        fireEvent.click(getByText('삭제하기'));

        expect(dispatch).toBeCalledTimes(1);
      });
    });

    context('with confirm false', () => {
      it('click onRemove', () => {
        global.confirm = () => false;
        const { getByText } = render((
          <MemoryRouter>
            <RecipeContainer />
          </MemoryRouter>
        ));

        fireEvent.click(getByText('삭제하기'));

        expect(dispatch).toBeCalledTimes(0);
      });
    });
  });
});
