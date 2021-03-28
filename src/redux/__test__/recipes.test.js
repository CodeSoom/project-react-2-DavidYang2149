import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  setRecipes,
  addRecipes,
  loadRecipes,
} from '../recipes';
import sampleRecipes from '../../../fixtures/recipes';

jest.mock('../../services/recipes');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('recipes reducer', () => {
  const initialState = {
    recipesBook: [],
    lastRecipe: { recipe: null, isLast: false },
  };

  context('when previous state is undefined', () => {
    it('return initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setRecipes', () => {
    it('update recipes', () => {
      const state = reducer(initialState, setRecipes(sampleRecipes));
      const result = {
        recipesBook: [...sampleRecipes],
        lastRecipe: { recipe: null, isLast: false },
      };

      expect(state).toEqual(result);
    });
  });
});

describe('recipes actions', () => {
  describe('loadRecipes', () => {
    context('with return values', () => {
      it('runs setRecipes', async () => {
        const initialState = {
          recipes: {
            recipesBook: [],
            lastRecipe: { recipe: null, isLast: false },
          },
        };
        const store = mockStore(initialState);
        store.getState = () => initialState;

        await store.dispatch(loadRecipes([]));

        const actions = store.getActions();

        expect(actions[0]).toEqual(addRecipes([]));
      });
    });

    // TODO: empty value case
    // context('with return empty values', () => {
    //   it('runs setRecipes', async () => {
    //     const store = mockStore({});

    //     await store.dispatch(loadRecipes([]));

    //     const actions = store.getActions();

    //     expect(actions[0]).toEqual(setRecipes([]));
    //   });
    // });
  });
});
