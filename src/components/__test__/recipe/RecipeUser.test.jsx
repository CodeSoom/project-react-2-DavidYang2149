import React from 'react';
import { render } from '@testing-library/react';

import RecipeUser from '../../recipe/RecipeUser';

describe('RecipeUser', () => {
  const renderRecipeUser = ({ user, created }) => render((
    <RecipeUser
      user={user}
      created={created}
    />
  ));

  it('render values', () => {
    const { container } = renderRecipeUser({ user: '테스트유저@gmail.com', created: '2021-03-30-10:40:12' });

    expect(container).toHaveTextContent('테스트유저');
    expect(container).toHaveTextContent('2021-03-30');
  });
});
