import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, {
  setUser,
  clearUser,
  sessionLoginCheck,
} from '../user';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('user reducer', () => {
  const initialState = {
    userId: '',
    displayName: '',
  };

  context('when previous state is undefined', () => {
    it('return initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setUser', () => {
    it('update user', () => {
      const user = {
        userId: 'testId',
        displayName: '',
      };

      const state = reducer(initialState, setUser({ name: 'userId', value: 'testId' }));

      expect(state).toEqual(user);
    });
  });

  describe('clearUser', () => {
    it('update user', () => {
      const user = {
        userId: 'testId',
        displayName: 'testUserName',
      };

      const state = reducer(user, clearUser());

      expect(state).toEqual(initialState);
    });
  });
});

describe('recipes actions', () => {
  describe('sessionLoginCheck', () => {
    // TODO: session value case
    // context('with currentUser values', () => {
    //   it('runs setUser', async () => {
    //     const store = mockStore({});

    //     await store.dispatch(sessionLoginCheck());

    //     const actions = store.getActions();

    //     expect(actions[0]).toEqual(setUser());
    //   });
    // });

    context('without currentUser values', () => {
      it('runs clearUser', async () => {
        const store = mockStore({});

        await store.dispatch(sessionLoginCheck());

        setTimeout(() => {
          const actions = store.getActions();

          expect(actions[0]).toEqual(clearUser());
        }, 1500);
      });
    });
  });
});
