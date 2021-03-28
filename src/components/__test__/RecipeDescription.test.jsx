import React from 'react';
import { render } from '@testing-library/react';

import RecipeDescription from '../RecipeDescription';

describe('RecipeDescription', () => {
  const onChange = jest.fn();
  beforeEach(() => {
    onChange.mockClear();
  });

  const renderRecipeDescription = ({
    description, onChangeRecipe,
  }) => render((
    <RecipeDescription
      description={description}
      onChangeRecipe={onChangeRecipe}
    />
  ));

  it('render values', () => {
    const description = '베이킹 방법 설명';
    const { container } = renderRecipeDescription({ description, onChangeRecipe: onChange });

    expect(container).toHaveTextContent('베이킹 방법 설명');
  });
});
