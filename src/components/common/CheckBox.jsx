import React from 'react';

export default function CheckBox({ message, value = false, onClick }) {
  return (
    <div className="flex flex-100 mt-4 items-start">
      <input
        className="h-6 w-6 mr-2 checkbox"
        type="checkbox"
        value={value}
        onClick={onClick}
      />
      <div className="leading-tight text-gray-600 font-light">
        <span>{message}</span>
      </div>
    </div>
  );
}
