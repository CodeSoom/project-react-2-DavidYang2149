import React from 'react';

export default function TextField({
  labelClass, inputClass,
  label, type = 'text', id, name, value, readOnly = false, onChange,
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
      <input
        className={inputClass}
        type={type}
        id={id}
        name={name}
        value={value}
        readOnly={readOnly}
        onChange={handleChange}
        placeholder={`${label}(을)를 입력하세요`}
      />
    </>
  );
}
