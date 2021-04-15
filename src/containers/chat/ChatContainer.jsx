/* eslint-disable consistent-return */
import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChatMessageList from '../../components/chat/ChatMessageList';
import ChatMessageWriteBox from '../../components/chat/ChatMessageWriteBox';
import Loading from '../../components/common/Loading';
import RecipeNotFound from '../../components/recipe/RecipeNotFound';
import { ChatBox } from '../../layouts/chat/Chat';
import { changeMessage, writeMessage } from '../../redux/chat';
import {
  isEmpty,
  isMatch,
  isNotEmpty,
  getFirstSplit,
  isLessThen,
  isGreaterThen,
} from '../../utils/utils';

const ChatContainer = () => {
  const dispatch = useDispatch();
  const lastChat = useRef();
  const [loadingTime, setLoadingTime] = useState(0);

  const checkCurrentSecond = (value) => isMatch(loadingTime)(value);
  const isLessThenFiveSecond = (value) => isLessThen(5)(value);
  const isGreaterThenFiveSecond = (value) => isGreaterThen(5)(value);

  const {
    user: {
      userId,
    }, chat: {
      chatList, message,
    },
  } = useSelector((state) => ({
    user: state.user,
    chat: state.chat,
  }));

  useEffect(() => {
    // XXX CASE: Terminate Sequence (Result: Loading Failed)
    if (checkCurrentSecond(-1)) {
      return;
    }

    // XXX CASE: Loading Failed
    if (isGreaterThenFiveSecond(loadingTime) && isEmpty(userId)) {
      setLoadingTime(-1);
      return;
    }

    // XXX CASE: Loading Success
    if (isLessThenFiveSecond(loadingTime) && isNotEmpty(userId)) {
      setLoadingTime(0);
      return;
    }

    const timeout = setTimeout(() => setLoadingTime(loadingTime + 1), 1000);

    return () => clearTimeout(timeout);
  }, [userId, loadingTime]);

  const owner = getFirstSplit(userId)('@');

  const onChangeMessage = useCallback((event) => {
    const { name, value } = event.target;
    dispatch(changeMessage({ name, value }));
  }, [dispatch]);

  const onKeyPressMessage = useCallback(async (event) => {
    if (isEmpty(message.trim())) {
      return;
    }

    if (isMatch(event.key)('Enter')) {
      await dispatch(writeMessage());
      lastChat.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dispatch, message]);

  const onSubmit = useCallback(async () => {
    if (isEmpty(message)) {
      return;
    }

    await dispatch(writeMessage());
    lastChat.current.scrollIntoView({ behavior: 'smooth' });
  }, [dispatch, message]);

  if (isEmpty(userId) && isMatch(loadingTime)(-1)) {
    return (
      <RecipeNotFound />
    );
  }

  if (isEmpty(userId)) {
    return (
      <Loading />
    );
  }

  return (
    <ChatBox>
      <ChatMessageList
        chatList={chatList}
        owner={owner}
        lastChat={lastChat}
      />
      <ChatMessageWriteBox
        message={message}
        onChangeMessage={onChangeMessage}
        onKeyPressMessage={onKeyPressMessage}
        onSubmit={onSubmit}
      />
    </ChatBox>
  );
};

export default ChatContainer;
