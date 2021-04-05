import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/common/Header';
import { setUser, clearUser } from '../../redux/user';
import { auth, provider } from '../../services/firebase';
import { saveItem } from '../../utils/storage';
import { isNotEmpty } from '../../utils/utils';

const HeaderContainer = () => {
  const dispatch = useDispatch();

  const { user: { userId } } = useSelector((state) => ({
    user: state.user,
  }));

  const signInWithGoogle = useCallback(async () => {
    const { user: { email } } = await auth.signInWithPopup(provider);
    if (isNotEmpty(email)) {
      saveItem('user', email);
      dispatch(setUser({ name: 'userId', value: email }));
    }
  }, [dispatch]);

  const signOut = useCallback(async () => {
    await auth.signOut();
    dispatch(clearUser());
  }, [dispatch]);

  return (
    <Header
      userId={userId}
      signInWithGoogle={signInWithGoogle}
      signOut={signOut}
    />
  );
};

export default HeaderContainer;
