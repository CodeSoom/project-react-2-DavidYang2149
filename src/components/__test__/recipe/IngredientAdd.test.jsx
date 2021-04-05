import React from 'react';
import { render } from '@testing-library/react';

import IngredientAdd from '../../recipe/IngredientAdd';

describe('IngredientAdd', () => {
  const onChange = jest.fn();
  beforeEach(() => {
    onChange.mockClear();
  });

  const renderIngredientAdd = ({
    newId, newIngredient,
    onChangeNewIngredient, onKeyUpSetNewIngredient, onClickSetNewIngredient,
  }) => render((
    <IngredientAdd
      newId={newId}
      newIngredient={newIngredient}
      onChangeNewIngredient={onChangeNewIngredient}
      onKeyUpSetNewIngredient={onKeyUpSetNewIngredient}
      onClickSetNewIngredient={onClickSetNewIngredient}
    />
  ));

  it('render values', () => {
    const { container } = renderIngredientAdd({
      newId: 1,
      newIngredient: { ingredient: '', weight: 0 },
      onChangeNewIngredient: onChange,
      onKeyUpSetNewIngredient: onChange,
      onClickSetNewIngredient: onChange,
    });

    expect(container).toHaveTextContent('추가하기');
  });
});
