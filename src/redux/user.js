import { createSlice } from '@reduxjs/toolkit';

import { auth } from '../services/firebase';
import { saveItem, loadItem } from '../utils/storage';

const initialState = {
  userId: '',
  displayName: '',
};

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload: { name, value } }) {
      return {
        ...state,
        [name]: value,
      };
    },
    clearUser(state) {
      return {
        ...state,
        userId: '',
        displayName: '',
      };
    },
  },
});

export function sessionLoginCheck() {
  return async (dispatch) => {
    setTimeout(() => {
      const user = auth.currentUser || loadItem('user');

      if (user) {
        saveItem('user', user.email);
        dispatch(actions.setUser({ name: 'userId', value: user.email }));
      } else {
        dispatch(actions.clearUser());
      }
    }, 1300);
  };
}

export const {
  setUser,
  clearUser,
} = actions;

export default reducer;
