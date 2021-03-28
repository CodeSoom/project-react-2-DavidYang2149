import React from 'react';

import {
  Input, Label, Span, Button,
} from '../layouts/Recipe';
import { isEmpty } from '../utils/utils';

const IngredientAdd = ({
  newId, newIngredient, NewIngredientRef,
  onChangeNewIngredient, onKeyUpSetNewIngredient, onClickSetNewIngredient,
}) => {
  return (
    <section>
      <ul>
        <li>
          <Label
            width="32%"
            display="inline-block"
            htmlFor={`ingredient-${newId}`}
          >
            원재료
          </Label>
          <Label
            width="20%"
            display="inline-block"
            htmlFor={`weight-${newId}`}
          >
            용량
          </Label>
        </li>
        <li>
          <Input
            type="text"
            id={`ingredient-${newId}`}
            name={`ingredient-${newId}`}
            value={newIngredient.ingredient}
            onChange={onChangeNewIngredient}
            onKeyUp={onKeyUpSetNewIngredient}
            width="30%"
            ref={NewIngredientRef}
          />
          <Input
            type="number"
            id={`weight-${newId}`}
            name={`weight-${newId}`}
            value={newIngredient.weight}
            onChange={onChangeNewIngredient}
            onKeyUp={onKeyUpSetNewIngredient}
            width="20%"
          />
          <Span>g</Span>
          <Button
            type="button"
            onClick={onClickSetNewIngredient}
            disabled={isEmpty(newIngredient.ingredient) || isEmpty(newIngredient.weight)}
          >
            추가하기
          </Button>
        </li>
      </ul>
    </section>
  );
};

export default IngredientAdd;
