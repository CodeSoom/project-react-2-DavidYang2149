import React from 'react';

import SelectField from '../components/SelectField';
import TextField from '../components/TextField';
import TextAreaField from '../components/TextAreaField';

import CheckBox from '../components/common/CheckBox';

import Border from '../layouts/Border';

export default function RecipeDetailContainer({ recipe, categories }) {
  const {
    name, category, product, bakingTemperature, bakingTime, process,
  } = recipe;

  const handleChange = () => {
    // TODO onChange
  };

  return (
    <>
      <Border message="Recipe" />

      <div className="flex flex-100 mt-8">
        <div className="flex-100">
          <div className="flex flex-100 mt-4">
            <div className="flex-grow mr-2">
              <TextField
                labelClass="block mb-1 font-bold"
                inputClass="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                label="레시피명"
                id="recipe-name"
                name="name"
                value={name}
                // readOnly
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-100">
            <div className="flex-grow mr-2">
              <SelectField
                labelClass="block mb-1 font-bold"
                selectClass="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                label="카테고리"
                id="recipe-category"
                name="category"
                value={category}
                options={categories}
                onChange={handleChange}
              />
            </div>
            <div className="flex-grow ml-2">
              <TextField
                labelClass="block mb-1 font-bold"
                inputClass="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                label="생산량"
                id="recipe-product"
                type="number"
                name="product"
                value={product}
                // readOnly
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-100">
            <div className="flex-grow mr-2">
              <TextField
                labelClass="block mb-1 font-bold"
                inputClass="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                label="오븐 온도(℃)"
                id="recipe-bakingTemperature"
                type="number"
                name="bakingTemperature"
                value={bakingTemperature}
                // readOnly
                onChange={handleChange}
              />
            </div>
            <div className="flex-grow ml-2">
              <TextField
                labelClass="block mb-1 font-bold"
                inputClass="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                label="굽는 시간(min)"
                id="recipe-bakingTime"
                name="bakingTime"
                value={bakingTime}
                // readOnly
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-100 mt-4">
            <div className="flex-grow mr-2">
              <TextAreaField
                labelClass="block mb-1 font-bold"
                textAreaClass="bg-gray-200 w-full rounded-lg py-3 px-3 shadow-inner"
                id="recipe-process"
                label="만드는 방법"
                name="process"
                value={process}
                // readOnly
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-100 mt-4">
            <CheckBox
              message="전체 무게 계산하기"
            />
          </div>

        </div>
      </div>
    </>
  );
}
