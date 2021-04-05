import React from 'react';

import { Title } from '../../layouts/Recipe';

const RecipeTitle = ({ title }) => {
  return (
    <Title>
      {title}
    </Title>
  );
};

export default React.memo(RecipeTitle);
