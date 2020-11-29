import React from 'react';

export default function TextAreaField({
  labelClass, textAreaClass,
  label, id, name, value, readOnly = false, onChange,
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
      <textarea
        className={textAreaClass}
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
