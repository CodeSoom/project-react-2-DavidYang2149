import React from 'react';

import { render } from '@testing-library/react';

import RecipePage from './RecipePage';

describe('RecipePage', () => {
  it('renders page', () => {
    render((
      <RecipePage />
    ));
  });
});
