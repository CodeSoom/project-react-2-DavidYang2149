import React from 'react';
import { render } from '@testing-library/react';

import RecipeBasicInfo from '../../recipe/RecipeBasicInfo';

describe('RecipeBasicInfo', () => {
  const onChangeRecipe = jest.fn();
  beforeEach(() => {
    onChangeRecipe.mockClear();
  });

  const renderRecipeBasicInfo = ({
    title, category, product,
  }) => render((
    <RecipeBasicInfo
      title={title}
      category={category}
      product={product}
      onChangeRecipe={onChangeRecipe}
    />
  ));

  describe('Check input tag validate', () => {
    context('with title, category, product', () => {
      it('render values', () => {
        const title = '마들렌';
        const category = 1;
        const product = 16;
        const { getByLabelText } = renderRecipeBasicInfo({ title, category, product });

        expect(getByLabelText('레시피명')).toHaveValue('마들렌');
        expect(getByLabelText('카테고리')).toHaveValue('1');
        expect(getByLabelText('생산량')).toHaveValue(16);
      });
    });
  });
});
