import React from 'react';

import { UserName, Date, Line } from '../../layouts/Recipe';
import { getFirstSplit } from '../../utils/utils';

const RecipeUser = ({ user, created }) => {
  return (
    <>
      <UserName>{getFirstSplit(user)('@')}</UserName>
      {' '}
      <Date>{created.substr(0, 10)}</Date>
      <Line />
    </>
  );
};

export default React.memo(RecipeUser);
