import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import TextAreaField from './TextAreaField';

describe('TextAreaField', () => {
  it('renders value', () => {
    const name = 'process';
    const value = '마들렌 만드는 방법';

    const handleChange = jest.fn();

    const { getByLabelText } = render((
      <TextAreaField
        label="만드는 방법"
        name={name}
        value={value}
        onChange={handleChange}
      />
    ));

    expect(getByLabelText('만드는 방법').value).toBe(value);
  });

  it('listens change events', () => {
    const name = 'process';
    const value = '마들렌 만드는 방법';

    const handleChange = jest.fn();

    const { getByLabelText } = render((
      <TextAreaField
        label="만드는 방법"
        name={name}
        value={value}
        onChange={handleChange}
      />
    ));

    fireEvent.change(getByLabelText('만드는 방법'), { target: { value } });

    expect(handleChange).toBeCalledWith({ name, value });
  });
});
