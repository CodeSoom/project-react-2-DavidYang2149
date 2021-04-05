/* eslint-disable consistent-return */
import React from 'react';
import { LoadingAnimation, Modal } from '../../layouts/common/Loading';

const Loading = () => {
  return (
    <Modal>
      <LoadingAnimation />
    </Modal>
  );
};

export default Loading;
