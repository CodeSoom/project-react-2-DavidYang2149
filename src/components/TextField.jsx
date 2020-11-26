import React from 'react';

export default function TextField({
  label, type = 'text', name, value, onChange,
}) {
  const id = `input-${name}`;

  function handleChange(event) {
    const { target } = event;
    onChange({ name, value: target.value });
  }

  return (
    <div className="field">
      <div className="field-label">
        <label htmlFor={id} className="label">
          {label}
        </label>
      </div>
      <div className="control">
        <input
          className="input is-primary"
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
