import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import SelectField from './SelectField';

import categories from '../../fixtures/categories';

describe('SelectField', () => {
  it('renders value', () => {
    const name = 'category';
    const value = '구움과자';

    const handleChange = jest.fn();

    const { getByLabelText } = render((
      <SelectField
        label="카테고리"
        id="recipe-category"
        name={name}
        value={value}
        options={categories}
        onChange={handleChange}
      />
    ));

    expect(getByLabelText('카테고리').value).toBe(value);
  });

  it('listens change events', () => {
    const name = 'category';
    const value = '구움과자';

    const handleChange = jest.fn();

    const { getByLabelText } = render((
      <SelectField
        label="카테고리"
        id="recipe-category"
        name={name}
        value="쿠키"
        options={categories}
        onChange={handleChange}
      />
    ));

    fireEvent.change(getByLabelText('카테고리'), { target: { value } });

    expect(handleChange).toBeCalledWith({ name, value });
  });
});
