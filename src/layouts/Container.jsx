import React from 'react';

export default function Container(props) {
  const { children } = props;
  return (
    <>
      <div className="container mx-auto mt-32">
        <div className="mx-auto flex flex-wrap max-width-form text-gray-800">
          {children}
        </div>
      </div>
    </>
  );
}