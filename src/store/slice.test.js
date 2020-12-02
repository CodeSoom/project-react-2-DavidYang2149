import { getDefaultMiddleware } from '@reduxjs/toolkit';

import configureStore from 'redux-mock-store';

import reducer, {
  setRecipe,
  setCategories,
  loadRecipe,
  loadCategories,
} from './slice';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      recipe: {
        bakingTemperature: '',
        bakingTime: '',
        category: '쿠키',
        ingredients: [],
        name: '',
        process: '',
        product: 0,
      },
      categories: [],
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setRecipe', () => {
    it('changes recipe', () => {
      const initialState = {
        recipe: {
          name: '',
          category: '쿠키',
          product: 0,
          bakingTemperature: '',
          bakingTime: '',
          ingredients: [],
          process: '',
        },
      };

      const recipe = {
        name: '마들렌',
        category: '구움과자',
        product: 16,
        bakingTemperature: '180',
        bakingTime: '10-15',
        ingredients: [
          { ingredientName: '설탕', weight: 150 },
          { ingredientName: '버터', weight: 150 },
          { ingredientName: '전란', weight: 100 },
          { ingredientName: '박력분', weight: 150 },
        ],
        process: '마들렌 만드는 방법.',
      };

      const state = reducer(initialState, setRecipe(recipe));

      expect(state.recipe.name).toBe('마들렌');
      expect(state.recipe.category).toBe('구움과자');
    });
  });

  describe('setCategories', () => {
    it('changes categories', () => {
      const initialState = {
        categories: [],
      };

      const categories = ['쿠키', '구움과자', '타르트', '케이크', '빵', '디저트', '마카롱'];

      const state = reducer(initialState, setCategories(categories));

      expect(state.categories).toHaveLength(7);
    });
  });
});

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('actions', () => {
  let store;

  describe('loadRecipe', () => {
    context('with setRecipe', () => {
      beforeEach(() => {
        store = mockStore();
      });

      it('runs setRecipe', async () => {
        await store.dispatch(loadRecipe());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRecipe({}));
      });
    });
  });

  describe('loadCategories', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('run setCategories', async () => {
      await store.dispatch(loadCategories());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setCategories([]));
    });
  });
});
