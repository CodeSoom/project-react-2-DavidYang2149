import React from 'react';

import categories from '../fixtures/categories';

import recipeMock from '../fixtures/recipe';

export default function App({ recipe = recipeMock }) {
  const {
    name,
    category,
    product,
    bakingTemperature,
    bakingTime,
    ingredients,
    process,
  } = recipe;
  return (
    <>
      <h1>Oh My Baking Recipe</h1>
      <div>
        <label htmlFor="recipe-name">
          레시피명
        </label>
        <input
          id="recipe-name"
          name="name"
          value={name}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="recipe-category">
          카테고리
        </label>
        <select
          id="recipe-category"
          name="category"
          value={category}
          readOnly
        >
          {
            categories.map((kind) => (
              <option
                key={kind}
                value={kind}
              >
                {kind}
              </option>
            ))
          }
        </select>
      </div>
      <div>
        <label htmlFor="recipe-product">
          생산량
        </label>
        <input
          id="recipe-product"
          name="product"
          value={product}
          readOnly
        />
        &nbsp;
        개
      </div>
      <div>
        <label htmlFor="recipe-bakingTemperature">
          오븐 온도
        </label>
        <input
          id="recipe-bakingTemperature"
          name="bakingTemperature"
          value={bakingTemperature}
          readOnly
        />
        &nbsp;
        ℃
        &nbsp;
        <label htmlFor="recipe-bakingTime">
          굽는 시간
        </label>
        <input
          id="recipe-bakingTime"
          name="bakingTime"
          value={bakingTime}
          readOnly
        />
        &nbsp;
        분
      </div>
      <ul>
        {
          ingredients.length !== 0 && (
            ingredients.map(({ ingredientName, weight }) => (
              <li key={ingredientName}>
                <label htmlFor="recipe-ingredientName">
                  재료
                </label>
                <input
                  id="recipe-ingredientName"
                  name="ingredientName"
                  value={ingredientName}
                  readOnly
                />
                &nbsp;
                <input
                  id="recipe-weight"
                  name="weight"
                  value={weight}
                  readOnly
                />
                g
              </li>
            ))
          )
        }
        <li>
          <label htmlFor="recipe-ingredient-new">
            재료
          </label>
          <input
            id="recipe-ingredientName-new"
            name="ingredientName"
            readOnly
          />
          &nbsp;
          <input
            id="recipe-weight-new"
            name="weight"
            readOnly
          />
          g
        </li>
      </ul>
      <div>
        <label htmlFor="recipe-process">
          만드는 방법
        </label>
        <textarea
          id="recipe-process"
          name="process"
          value={process}
          readOnly
        />
      </div>
    </>
  );
}
