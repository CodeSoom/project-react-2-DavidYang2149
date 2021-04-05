import React from 'react';

import {
  Label, DutyLabel, Input, Select, Span,
} from '../../layouts/Recipe';
import { isEmpty } from '../../utils/utils';

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
      {isEmpty(onChangeRecipe)
        ? (
          <Label
            htmlFor="title"
            display="block"
          >
            레시피명
          </Label>
        ) : (
          <DutyLabel
            htmlFor="title"
            display="block"
          >
            레시피명
          </DutyLabel>
        )}
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
      {isEmpty(onChangeRecipe)
        ? (
          <>
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
          </>
        ) : (
          <>
            <DutyLabel
              htmlFor="category"
              width="30%"
              display="inline-block"
            >
              카테고리
            </DutyLabel>
            <DutyLabel
              htmlFor="product"
              width="20%"
              display="inline-block"
            >
              생산량
            </DutyLabel>
          </>
        )}
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
          min="0"
          max="1000000000"
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

export default React.memo(RecipeBasicInfo);
