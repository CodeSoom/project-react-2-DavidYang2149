import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import allConditionsState from '../../../../fixtures/allConditionsState';
import { auth } from '../../../services/firebase';
import HeaderContainer from '../../common/HeaderContainer';

jest.mock('react-redux');

describe('HeaderContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector(allConditionsState));

    // Google Firebase
    const result = { user: { email: 'test@email.com', displayName: 'test' } };
    auth.signInWithPopup = jest.fn(() => result);
    auth.signOut = jest.fn();
  });

  it('renders container', () => {
    render((
      <MemoryRouter>
        <HeaderContainer />
      </MemoryRouter>
    ));
  });

  context('with login success', () => {
    it('click sign in', async () => {
      const { getByText } = render((
        <MemoryRouter>
          <HeaderContainer />
        </MemoryRouter>
      ));

      fireEvent.click(getByText('Sign in (Google)'));

      await expect(auth.signInWithPopup).toBeCalledTimes(1);

      expect(dispatch).toBeCalledWith({
        type: 'user/setUser',
        payload: { name: 'userId', value: 'test@email.com' },
      });
    });
  });

  context('with login failed', () => {
    it('click sign in', async () => {
      // failed Case
      const result = { user: { email: '', displayName: '' } };
      auth.signInWithPopup = jest.fn(() => result);

      const { getByText } = render((
        <MemoryRouter>
          <HeaderContainer />
        </MemoryRouter>
      ));

      fireEvent.click(getByText('Sign in (Google)'));

      await expect(auth.signInWithPopup).toBeCalledTimes(1);

      expect(dispatch).not.toBeCalled();
    });
  });

  it('click Logout', async () => {
    // Already Login Case
    useSelector.mockImplementation((selector) => selector({
      ...allConditionsState,
      user: { userId: 'test@email.com', displayName: 'test' },
    }));

    const { getByText } = render((
      <MemoryRouter>
        <HeaderContainer />
      </MemoryRouter>
    ));

    fireEvent.click(getByText('Logout'));

    await expect(auth.signOut).toBeCalledTimes(1);

    expect(dispatch).toBeCalledWith({ type: 'user/clearUser' });
  });
});
