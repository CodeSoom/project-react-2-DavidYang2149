import React from 'react';

export default function Border({ message }) {
  return (
    <>
      <div className="flex items-center flex-100 mt-8">
        <hr className="border-t-2 flex-auto" />
        <span className="px-4 text-gray-600 font-light">
          {message}
        </span>
        <hr className="border-t-2 flex-auto" />
      </div>
    </>
  );
}
