import React from 'react';

import { ChatMessageItem, MyChatMessageItem } from '../../layouts/chat/Chat';
import { isMatch, isNotMatch } from '../../utils/utils';

const ChatMessage = ({ chat, owner, preUser }) => {
  if (isMatch(chat.user)(owner) && isNotMatch(chat.user)(preUser)) {
    return (
      <MyChatMessageItem>
        <div>
          <div>
            <span>{chat.user}</span>
            <p>{chat.message}</p>
          </div>
          <img src="images/user-solid-circle.svg" alt="User" />
        </div>
      </MyChatMessageItem>
    );
  }

  if (isMatch(chat.user)(owner) && isMatch(chat.user)(preUser)) {
    return (
      <MyChatMessageItem className="continueMessage">
        <div>
          <div>
            <p>{chat.message}</p>
          </div>
          <span className="hidden" />
        </div>
      </MyChatMessageItem>
    );
  }

  if (isNotMatch(chat.user)(owner) && isMatch(chat.user)(preUser)) {
    return (
      <ChatMessageItem className="continueMessage">
        <div>
          <span className="hidden" />
          <div>
            <p>{chat.message}</p>
          </div>
        </div>
      </ChatMessageItem>
    );
  }

  // XXX LAST CASE: isNotMatch(chat.user)(owner) && isNotMatch(chat.user)(preUser)
  return (
    <ChatMessageItem>
      <div>
        <img src="images/user-solid-circle.svg" alt="User" />
        <div>
          <span>{chat.user}</span>
          <p>{chat.message}</p>
        </div>
      </div>
    </ChatMessageItem>
  );
};

export default React.memo(ChatMessage);
