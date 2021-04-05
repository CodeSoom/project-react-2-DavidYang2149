import React from 'react';
import { render } from '@testing-library/react';

import IngredientItem from '../../recipe/IngredientItem';

describe('IngredientItem', () => {
  const onChange = jest.fn();
  beforeEach(() => {
    onChange.mockClear();
  });

  const renderIngredientItem = ({
    id, ingredient, weight, onChangeIngredient, onRemoveIngredient, provided,
  }) => render((
    <IngredientItem
      id={id}
      ingredient={ingredient}
      weight={weight}
      onChangeIngredient={onChangeIngredient}
      onRemoveIngredient={onRemoveIngredient}
      provided={provided}
    />
  ));

  context('with ingredient', () => {
    const provided = {
      draggableProps: {
        style: {},
      },
      dragHandleProps: {
        style: {},
      },
      innerRef: jest.fn(),
    };

    it('render values', () => {
      const id = 1;
      const ingredient = '박력분';
      const weight = '100';
      const { getByDisplayValue } = renderIngredientItem({
        id,
        ingredient,
        weight,
        onChangeIngredient: onChange,
        onRemoveIngredient: onChange,
        provided,
      });

      expect(getByDisplayValue('박력분')).toHaveValue('박력분');
      expect(getByDisplayValue('100')).toHaveValue(100);
    });
  });

  context('without ingredient', () => {
    it('render nothing', () => {
      const { container } = renderIngredientItem({ id: 0 });

      expect(container).toBeEmptyDOMElement();
    });
  });
});
