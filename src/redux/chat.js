import { createSlice } from '@reduxjs/toolkit';

import { fetchMessages, postMessage } from '../services/messages';
import { isEmpty, formatMessage } from '../utils/utils';

const initialState = {
  chatList: [],
  message: '',
};

const { actions, reducer } = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatList(state, { payload }) {
      return {
        ...state,
        chatList: [...payload],
      };
    },
    changeMessage(state, { payload: { name, value } }) {
      return {
        ...state,
        [name]: value,
      };
    },
    clearMessage(state) {
      return {
        ...state,
        message: '',
      };
    },
  },
});

export function loadMessages() {
  return async (dispatch) => {
    const response = await fetchMessages();
    const messages = response.map((doc) => formatMessage(doc));

    dispatch(actions.setChatList(messages));
  };
}

export function writeMessage() {
  return async (dispatch, getState) => {
    const {
      user: { userId },
      chat: { message },
    } = getState();

    if (isEmpty(userId)) {
      return;
    }

    await postMessage({ userId, message });
    await dispatch(actions.clearMessage());
    await dispatch(loadMessages());
  };
}

export const {
  setChatList,
  changeMessage,
} = actions;

export default reducer;
