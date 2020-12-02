import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import TextField from './TextField';

describe('TextField', () => {
  context('without type', () => {
    function renderTextField() {
      const handleChange = jest.fn();

      return render((
        <TextField
          label="레시피명"
          id="recipe-name"
          name="name"
          onChange={handleChange}
        />
      ));
    }

    it('renders label and input control', () => {
      const { queryByLabelText } = renderTextField();

      expect(queryByLabelText('레시피명')).not.toBeNull();
    });

    it('renders “text” input control', () => {
      const { container } = renderTextField();

      expect(container).toContainHTML('type="text"');
    });
  });

  context('with type', () => {
    function renderTextField() {
      const handleChange = jest.fn();

      return render((
        <TextField
          label="생산량"
          id="recipe-product"
          type="number"
          name="product"
          onChange={handleChange}
        />
      ));
    }

    it('renders label and input control', () => {
      const { queryByLabelText } = renderTextField();

      expect(queryByLabelText('생산량')).not.toBeNull();
    });

    it('renders “number” input control', () => {
      const { container } = renderTextField();

      expect(container).toContainHTML('type="number"');
    });
  });

  it('renders value', () => {
    const name = 'bakingTemperature';
    const value = '180';

    const handleChange = jest.fn();

    const { getByLabelText } = render((
      <TextField
        label="오븐 온도(℃)"
        id="recipe-bakingTemperature"
        type="number"
        name={name}
        value={value}
        onChange={handleChange}
      />
    ));

    expect(getByLabelText('오븐 온도(℃)').value).toBe(value);
  });

  it('listens change events', () => {
    const name = 'bakingTemperature';
    const value = '180';

    const handleChange = jest.fn();

    const { getByLabelText } = render((
      <TextField
        label="오븐 온도(℃)"
        id="recipe-bakingTemperature"
        type="number"
        name={name}
        onChange={handleChange}
      />
    ));

    fireEvent.change(getByLabelText('오븐 온도(℃)'), { target: { value } });

    expect(handleChange).toBeCalledWith({ name, value });
  });
});
