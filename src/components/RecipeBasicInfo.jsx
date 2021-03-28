import React from 'react';

import {
  Label, Input, Select, Span,
} from '../layouts/Recipe';
import { isEmpty } from '../utils/utils';

const RecipeBasicInfo = ({
  title, category, product, onChangeRecipe,
}) => {
  const categoryEnum = [
    { value: 0, text: '선택' },
    { value: 1, text: '쿠키' },
    { value: 2, text: '구움과자' },
    { value: 3, text: '케이크' },
    { value: 4, text: '빵' },
    { value: 5, text: '마카롱' },
    { value: 6, text: '기타' },
  ];

  return (
    <section>
      <Label
        htmlFor="title"
        display="block"
      >
        레시피명
      </Label>
      <Input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={onChangeRecipe}
        width="60%"
        display="block"
        disabled={isEmpty(onChangeRecipe)}
      />
      <Label
        htmlFor="category"
        width="30%"
        display="inline-block"
      >
        카테고리
      </Label>
      <Label
        htmlFor="product"
        width="20%"
        display="inline-block"
      >
        생산량
      </Label>
      <div>
        <Select
          id="category"
          name="category"
          value={category}
          onChange={onChangeRecipe}
          width="30%"
          disabled={isEmpty(onChangeRecipe)}
        >
          {categoryEnum.map(({ value, text }) => {
            return (<option key={value} value={value}>{text}</option>);
          })}
        </Select>
        <Input
          type="number"
          id="product"
          name="product"
          value={product}
          onChange={onChangeRecipe}
          width="20%"
          disabled={isEmpty(onChangeRecipe)}
        />
        <Span>개</Span>
      </div>
    </section>
  );
};

export default RecipeBasicInfo;
