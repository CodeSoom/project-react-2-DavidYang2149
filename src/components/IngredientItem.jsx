import React from 'react';

import {
  Input, Span, Button, Hamburger,
} from '../layouts/Recipe';
import { isEmpty } from '../utils/utils';

const IngredientItem = ({
  id, ingredient, weight,
  onChangeIngredient, onRemoveIngredient,
  provided,
}) => {
  if (isEmpty(id)) {
    return false;
  }

  if (isEmpty(provided)) {
    return (
      <li>
        <Input
          type="text"
          id={`ingredient-${id}`}
          name={`ingredient-${id}`}
          value={ingredient}
          width="30%"
          disabled
        />
        <Input
          type="number"
          id={`weight-${id}`}
          name={`weight-${id}`}
          value={weight}
          onChange={onChangeIngredient}
          width="20%"
          disabled
        />
        <Span>g</Span>
      </li>
    );
  }

  return (
    <li
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
    >
      <Hamburger />
      <Input
        type="text"
        id={`ingredient-${id}`}
        name={`ingredient-${id}`}
        value={ingredient}
        onChange={onChangeIngredient}
        width="24%"
      />
      <Input
        type="number"
        id={`weight-${id}`}
        name={`weight-${id}`}
        value={weight}
        onChange={onChangeIngredient}
        width="13%"
      />
      <Span>g</Span>
      <Button
        type="button"
        onClick={onRemoveIngredient}
        value={id}
      >
        삭제
      </Button>
    </li>
  );
};

export default IngredientItem;
