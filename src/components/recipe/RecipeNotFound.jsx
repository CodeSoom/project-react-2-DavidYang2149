import React from 'react';

import { Title, Img, Center } from '../../layouts/Recipe';

const RecipeNotFound = () => {
  return (
    <Center>
      <Img id="displayImage" src="images/page_not_found.svg" alt="recipe" />
      <Title>
        해당 페이지를 찾을 수 없습니다.
      </Title>
    </Center>
  );
};

export default RecipeNotFound;
