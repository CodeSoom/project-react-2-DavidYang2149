import React from 'react';

import { Paragraph } from '../layouts/Recipe';

const RecipeTitle = ({ title }) => {
  return (
    <Paragraph>
      {title}
    </Paragraph>
  );
};

export default RecipeTitle;
