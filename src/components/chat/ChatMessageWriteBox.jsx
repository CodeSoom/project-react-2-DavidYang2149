import React from 'react';

import {
  MessageBox,
  MessageInput,
  SendButton,
} from '../../layouts/chat/Chat';
import { isEmpty } from '../../utils/utils';

const ChatMessageWriteBox = ({
  message, onChangeMessage, onKeyPressMessage, onSubmit,
}) => {
  return (
    <MessageBox>
      <MessageInput
        type="text"
        name="message"
        onChange={onChangeMessage}
        // onKeyUp={onKeyUpMessage}
        onKeyPress={onKeyPressMessage}
        placeholder="메시지를 입력하세요"
        value={message}
      />
      <SendButton
        type="button"
        onClick={onSubmit}
        disabled={isEmpty(message)}
      >
        Send
      </SendButton>
    </MessageBox>
  );
};

export default React.memo(ChatMessageWriteBox);
