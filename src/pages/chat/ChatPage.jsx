import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ChatContainer from '../../containers/chat/ChatContainer';
import { loadMessages } from '../../redux/chat';
import { db } from '../../services/firebase';

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMessages());
  }, []);

  useEffect(() => {
    const chatRef = db.collection('messages');
    chatRef.orderBy('created').onSnapshot(() => {
      dispatch(loadMessages());
    });
  }, []);

  return (
    <>
      <ChatContainer />
    </>
  );
};

export default ChatPage;
