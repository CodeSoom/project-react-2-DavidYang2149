import React from 'react';
import { render } from '@testing-library/react';

import RecipeImage from '../../recipe/RecipeImage';

describe('RecipeImage', () => {
  const renderRecipeImage = ({ image }) => render((
    <RecipeImage
      image={image}
    />
  ));

  it('render values', () => {
    const { container } = renderRecipeImage({ image: 'images/cookie.jpeg' });

    expect(container).toHaveTextContent('이미지');
  });
});
