import React from 'react';

import Button from '../components/common/Button';

import Border from '../layouts/Border';

export default function RecipeIngredientsContainer({ ingredients }) {
  return (
    <>
      <Border message="Ingredients" />

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
                <div className="flex flex-100" key={ingredientName}>
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
            <Button
              buttonClass="bg-pink-button flex-50 text-white relative py-4 rounded"
              message="재료 추가하기"
            />
          </div>

        </div>
      </div>
    </>
  );
}
