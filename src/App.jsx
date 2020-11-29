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
    <div className="container mx-auto mt-32">
      <div className="mx-auto flex flex-wrap max-width-form text-gray-800">
        <div className="flex-100">
          <h1 className="font-bold text-3xl flex-100 mb-8">Oh My Baking Recipe</h1>
        </div>

        <div className="flex justify-between flex-100">
          <button
            className="bg-blue-button text-white relative px-20 py-4 rounded"
            type="button"
          >
            <div className="button-icon">
              <i>R</i>
            </div>
            <div>
              레시피 정보 저장하기
            </div>
          </button>
        </div>

        <div className="flex items-center flex-100 mt-8">
          <hr className="border-t-2 flex-auto" />
          <span className="px-4 text-gray-600 font-light">
            Recipe
          </span>
          <hr className="border-t-2 flex-auto" />
        </div>

        <div className="flex flex-100 mt-8">
          <div className="flex-100">
            <div className="flex flex-100 mt-4">
              <div className="flex-grow mr-2">
                <label className="block mb-1 font-bold" htmlFor="recipe-name">레시피명</label>
                <input
                  className="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                  type="text"
                  id="recipe-name"
                  placeholder="레시피명을 입력하세요"
                  name="name"
                  value={name}
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-100">
              <div className="flex-grow mr-2">
                <label className="block mb-1 font-bold" htmlFor="recipe-category">카테고리</label>
                <select
                  className="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                  id="recipe-category"
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
              <div className="flex-grow ml-2">
                <label className="block mb-1 font-bold" htmlFor="recipe-product">생산량</label>
                <input
                  className="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                  type="number"
                  id="recipe-product"
                  placeholder="몇개인지 입력하세요"
                  name="product"
                  value={product}
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-100">
              <div className="flex-grow mr-2">
                <label className="block mb-1 font-bold" htmlFor="recipe-bakingTemperature">오븐 온도</label>
                <input
                  className="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                  type="number"
                  id="recipe-bakingTemperature"
                  placeholder="℃"
                  name="bakingTemperature"
                  value={bakingTemperature}
                  readOnly
                />
              </div>
              <div className="flex-grow ml-2">
                <label className="block mb-1 font-bold" htmlFor="recipe-bakingTime">굽는 시간</label>
                <input
                  className="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                  type="text"
                  id="recipe-bakingTime"
                  placeholder="ex) 10-15 min"
                  name="bakingTime"
                  value={bakingTime}
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-100 mt-4">
              <div className="flex-grow mr-2">
                <label className="block mb-1 font-bold" htmlFor="recipe-process">만드는 방법</label>
                <textarea
                  className="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                  value={process}
                  nmae="process"
                  id="recipe-process"
                  placeholder="레시피를 만드는 방법을 적어주세요"
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-100 mt-4">
              <div className="flex flex-100 mt-4 items-start">
                <input className="h-6 w-6 mr-2 checkbox" type="checkbox" />
                <div className="leading-tight text-gray-600 font-light">
                  <span>총 g수 계산하기</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="flex items-center flex-100 mt-8">
          <hr className="border-t-2 flex-auto" />
          <span className="px-4 text-gray-600 font-light">
            Ingredients
          </span>
          <hr className="border-t-2 flex-auto" />
        </div>

        <div className="flex flex-100 mt-8">
          <div className="flex-100">
            <div className="flex flex-100">
              <div className="flex-grow mr-2">
                <p className="block mb-1 font-bold">재료</p>
              </div>
              <div className="flex-grow ml-2">
                <p className="block mb-1 font-bold">용량</p>
              </div>
            </div>

            {
              ingredients.length !== 0 && (
                ingredients.map(({ ingredientName, weight }, index) => (
                  <div className="flex flex-100">
                    <div className="flex-grow mr-2">
                      <input
                        className="bg-gray-200 rounded-lg py-3 px-3 shadow-inner"
                        type="text"
                        id={`recipe-ingredientName-${index}`}
                        placeholder="재료명을 입력하세요"
                        name="ingredientName"
                        value={ingredientName}
                      />
                    </div>
                    <div className="flex-grow ml-1">
                      <input
                        className="bg-gray-200 rounded-lg py-3 px-3 shadow-inner"
                        type="number"
                        id={`recipe-weight-${index}`}
                        placeholder="g을 입력하세요"
                        name="weight"
                        value={weight}
                      />
                    </div>
                    <div className="flex-grow ml-1">
                      <p className="mb-1 font-bold py-3 px-3">g</p>
                    </div>
                  </div>
                ))
              )
            }

            <div className="flex flex-100">
              <div className="flex-grow mr-2">
                <input
                  className="bg-gray-200 rounded-lg py-3 px-3 shadow-inner"
                  type="text"
                  id="recipe-ingredientName"
                  placeholder="재료명을 입력하세요"
                  name="ingredientName"
                  value=""
                />
              </div>
              <div className="flex-grow ml-1">
                <input
                  className="bg-gray-200 rounded-lg py-3 px-3 shadow-inner"
                  type="number"
                  id="recipe-weight"
                  placeholder="g을 입력하세요"
                  name="weight"
                  value=""
                />
              </div>
              <div className="flex-grow ml-1">
                <p className="mb-1 font-bold py-3 px-3">g</p>
              </div>
            </div>

            <div className="flex flex-100 mt-4">
              <button className="bg-pink-button flex-50 text-white relative py-4 rounded" type="button">
                <div>
                  재료 추가하기
                </div>
              </button>
            </div>

          </div>
        </div>

        <div className="flex items-center flex-100 mt-8">
          <hr className="border-t-2 flex-auto" />
        </div>

      </div>
    </div>
  );
}
