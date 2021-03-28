import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  setRecipe,
  setNewIngredient,
  changeRecipe,
  changeIngredient,
  changeNewIngredient,
  clearRecipe,
  loadRecipe,
  writeRecipe,
  removeRecipe,
} from '../recipe';

jest.mock('../../services/recipes');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('recipe reducer', () => {
  const initialState = {
    id: 0,
    userId: '',
    title: '',
    category: 0,
    product: 0,
    ingredients: [],
    newIngredient: { id: 0, ingredient: '', weight: 0 },
    description: '',
    upload: null,
    image: null,
  };

  context('when previous state is undefined', () => {
    it('return initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setRecipe', () => {
    it('update recipe', () => {
      const recipe = {
        id: 1,
        userId: '1',
        title: '마들렌',
        category: 1,
        product: 16,
        ingredients: [
          { id: 1, ingredient: '설탕', weight: 150 },
          { id: 2, ingredient: '버터', weight: 150 },
          { id: 3, ingredient: '전란', weight: 100 },
          { id: 4, ingredient: '박력분', weight: 150 },
        ],
        newIngredient: { id: 5, ingredient: '', weight: 0 },
        description: '마들렌 만드는 방법. 오븐 180도에 10분간 굽기',
        upload: null,
        image: null,
      };

      const state = reducer(initialState, setRecipe(recipe));

      expect(state).toEqual(recipe);
    });
  });

  describe('setNewIngredient', () => {
    it('update ingredients & delete newIngredient', () => {
      const recipe = {
        id: 0,
        userId: '',
        title: '',
        category: 0,
        product: 0,
        ingredients: [
          { id: 1, ingredient: '설탕', weight: 100 },
        ],
        newIngredient: { id: 0, ingredient: '', weight: 0 },
        description: '',
        upload: null,
        image: null,
      };

      const state = reducer(initialState, setNewIngredient({ fields: { id: 1, ingredient: '설탕', weight: 100 } }));

      expect(state).toEqual(recipe);
    });
  });

  describe('changeRecipe', () => {
    it('change recipe', () => {
      const recipe = {
        id: 0,
        userId: '',
        title: '맛있는마들렌',
        category: 0,
        product: 0,
        ingredients: [],
        newIngredient: { id: 0, ingredient: '', weight: 0 },
        description: '',
        upload: null,
        image: null,
      };

      const state = reducer(initialState, changeRecipe({ name: 'title', value: '맛있는마들렌' }));

      expect(state).toEqual(recipe);
    });
  });

  describe('changeIngredient', () => {
    context('onChange with values', () => {
      it('change ingredient', () => {
        const recipe = {
          id: 0,
          userId: '',
          title: '',
          category: 0,
          product: 0,
          ingredients: [
            { id: 1, ingredient: '버터', weight: 0 },
          ],
          newIngredient: { id: 0, ingredient: '', weight: 0 },
          description: '',
          upload: null,
          image: null,
        };

        const result = {
          id: 0,
          userId: '',
          title: '',
          category: 0,
          product: 0,
          ingredients: [
            { id: 1, ingredient: '버터', weight: 100 },
          ],
          newIngredient: { id: 0, ingredient: '', weight: 0 },
          description: '',
          upload: null,
          image: null,
        };

        const state = reducer(recipe, changeIngredient({ name: 'weight-1', value: 100 }));

        expect(state).toEqual(result);
      });
    });

    context('onChange with wrong values', () => {
      it('not change changeIngredient', () => {
        const recipe = {
          id: 0,
          userId: '',
          title: '',
          category: 0,
          product: 0,
          ingredients: [
            { id: 1, ingredient: '버터', weight: 0 },
          ],
          newIngredient: { id: 0, ingredient: '', weight: 0 },
          description: '',
          upload: null,
          image: null,
        };

        const state = reducer(recipe, changeIngredient({ name: 'weight-2', value: 100 }));

        expect(state).toEqual(recipe);
      });
    });
  });

  describe('changeNewIngredient', () => {
    it('change NewIngredient', () => {
      const recipe = {
        id: 0,
        userId: '',
        title: '',
        category: 0,
        product: 0,
        ingredients: [],
        newIngredient: { id: 0, ingredient: '', weight: 100 },
        description: '',
        upload: null,
        image: null,
      };

      const state = reducer(initialState, changeNewIngredient({ name: 'weight-0', value: 100 }));

      expect(state).toEqual(recipe);
    });
  });
});

describe('recipe actions', () => {
  describe('loadRecipe', () => {
    context('when insert right value (not empty)', () => {
      it('runs setRecipe', async () => {
        const initialState = {
          id: 0,
          userId: '',
          title: '',
          category: 0,
          product: 0,
          ingredients: [],
          newIngredient: { id: 0, ingredient: '', weight: 0 },
          description: '',
          created: false,
          updated: false,
          upload: null,
          image: null,
        };

        const store = mockStore({});

        await store.dispatch(loadRecipe(1));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRecipe(initialState));
      });
    });

    context('when insert right value (empty)', () => {
      it('runs setRecipe', async () => {
        const initialState = {
          id: 0,
          userId: '',
          title: '',
          category: 0,
          product: 0,
          ingredients: [],
          newIngredient: { id: 0, ingredient: '', weight: 0 },
          description: '',
          upload: null,
          image: null,
        };

        const store = mockStore({});

        await store.dispatch(loadRecipe(2));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRecipe(initialState));
      });
    });

    context('when insert wrong value', () => {
      it('runs setRecipe(init)', async () => {
        const initialState = {
          id: 0,
          userId: '',
          title: '',
          category: 0,
          product: 0,
          ingredients: [],
          newIngredient: { id: 0, ingredient: '', weight: 0 },
          description: '',
          upload: null,
          image: null,
        };

        const store = mockStore({});

        await store.dispatch(loadRecipe(0));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRecipe(initialState));
      });
    });
  });

  describe('writeRecipe', () => {
    context('when create new recipe', () => {
      it('run writeRecipe', async () => {
        const store = mockStore({
          user: {
            userId: 'test@test.com',
            displayName: 'testman',
          },
          recipe: {
            id: 1,
            userId: '',
            title: '마들렌',
            category: 1,
            product: 16,
            ingredients: [
              { id: 1, ingredient: '설탕', weight: 150 },
              { id: 2, ingredient: '버터', weight: 150 },
              { id: 3, ingredient: '전란', weight: 100 },
              { id: 4, ingredient: '박력분', weight: 150 },
            ],
            newIngredient: { id: 0, ingredient: '', weight: 0 },
            description: '마들렌 만드는 방법. 오븐 180도에 10분간 굽기',
            upload: null,
            image: null,
          },
        });

        // for Mock Result
        const result = {
          id: 0,
          userId: '',
          title: '',
          category: 0,
          product: 0,
          ingredients: [],
          newIngredient: { id: 0, ingredient: '', weight: 0 },
          description: '',
          created: false,
          updated: false,
          upload: null,
          image: null,
        };

        await store.dispatch(writeRecipe());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRecipe(result));
      });
    });
  });

  context('when update recipe', () => {
    it('run writeRecipe', async () => {
      const store = mockStore({
        user: {
          userId: 'test@test.com',
          displayName: 'testman',
        },
        recipe: {
          id: 1,
          userId: '1',
          title: '마들렌',
          category: 1,
          product: 16,
          ingredients: [
            { id: 1, ingredient: '설탕', weight: 150 },
            { id: 2, ingredient: '버터', weight: 150 },
            { id: 3, ingredient: '전란', weight: 100 },
            { id: 4, ingredient: '박력분', weight: 150 },
          ],
          newIngredient: { id: 0, ingredient: '', weight: 0 },
          description: '마들렌 만드는 방법. 오븐 180도에 10분간 굽기',
          upload: null,
          image: null,
        },
      });

      await store.dispatch(writeRecipe());
    });
  });

  context('when delete recipe', () => {
    it('run removeRecipe', async () => {
      const store = mockStore({
        user: {
          userId: 'test@test.com',
          displayName: 'testman',
        },
        recipe: {
          id: 1,
          userId: '1',
          title: '마들렌',
          category: 1,
          product: 16,
          ingredients: [
            { id: 1, ingredient: '설탕', weight: 150 },
            { id: 2, ingredient: '버터', weight: 150 },
            { id: 3, ingredient: '전란', weight: 100 },
            { id: 4, ingredient: '박력분', weight: 150 },
          ],
          newIngredient: { id: 0, ingredient: '', weight: 0 },
          description: '마들렌 만드는 방법. 오븐 180도에 10분간 굽기',
          upload: null,
          image: null,
        },
      });

      await store.dispatch(removeRecipe());

      const actions = store.getActions();

      expect(actions[0]).toEqual(clearRecipe());
    });
  });
});
