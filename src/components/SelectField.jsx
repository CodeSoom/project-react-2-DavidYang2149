import React from 'react';

export default function SelectField({
  labelClass, selectClass,
  label, id, name, value, options, readOnly = false, onChange,
}) {
  const handleChange = (event) => {
    const { target } = event;
    onChange({ name, value: target.value });
  };

  return (
    <>
      <label
        className={labelClass}
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className={selectClass}
        id={id}
        name={name}
        value={value}
        readOnly={readOnly}
        onChange={handleChange}
      >
        {
          options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))
        }
      </select>
    </>
  );
}
