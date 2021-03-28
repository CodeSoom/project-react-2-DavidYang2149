import React from 'react';

import { Label, Textarea } from '../layouts/Recipe';
import { isEmpty } from '../utils/utils';

const RecipeDescription = ({
  description, onChangeRecipe,
}) => {
  return (
    <section>
      <Label
        htmlFor="description"
        display="block"
      >
        만드는 방법
      </Label>
      <Textarea
        id="description"
        name="description"
        value={description}
        onChange={onChangeRecipe}
        disabled={isEmpty(onChangeRecipe)}
      />
    </section>
  );
};

export default RecipeDescription;
