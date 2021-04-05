import React from 'react';

import { Label, DutyLabel, Textarea } from '../../layouts/Recipe';
import { isEmpty } from '../../utils/utils';

const RecipeDescription = ({
  description, onChangeRecipe,
}) => {
  return (
    <section>
      {isEmpty(onChangeRecipe)
        ? (
          <Label
            htmlFor="description"
            display="block"
          >
            만드는 방법
          </Label>
        ) : (
          <DutyLabel
            htmlFor="description"
            display="block"
          >
            만드는 방법
          </DutyLabel>
        )}

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

export default React.memo(RecipeDescription);
