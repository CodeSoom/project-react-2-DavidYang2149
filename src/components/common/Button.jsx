import React from 'react';

export default function Button({ buttonClass, message, onClick }) {
  return (
    <button
      className={buttonClass}
      type="button"
      onClick={onClick}
    >
      <div>
        {message}
      </div>
    </button>
  );
}
