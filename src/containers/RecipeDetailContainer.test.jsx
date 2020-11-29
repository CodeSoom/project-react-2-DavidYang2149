import React from 'react';

import { render } from '@testing-library/react';

import RecipeDetailContainer from './RecipeDetailContainer';

import mockRecipe from '../../fixtures/recipe';
import mockCategories from '../../fixtures/categories';

describe('RecipeDetailContainer', () => {
  it('renders page', () => {
    const { container } = render((
      <RecipeDetailContainer recipe={mockRecipe} categories={mockCategories} />
    ));

    expect(container).toHaveTextContent('Recipe');

    expect(container).toHaveTextContent('레시피명');
    expect(container).toHaveTextContent('카테고리');
    expect(container).toHaveTextContent('생산량');

    expect(container).toHaveTextContent('오븐 온도');
    expect(container).toHaveTextContent('굽는 시간');

    expect(container).toHaveTextContent('만드는 방법');
  });
});
