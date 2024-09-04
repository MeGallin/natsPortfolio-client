import React, { useState } from 'react';
import './Name.css';

const Name = () => {
  const [heading, setHeading] = useState("Nat's");

  const handleInput = (event: React.FormEvent<HTMLSpanElement>) => {
    const text = event.currentTarget.innerText;
    setHeading(text);
  };

  return (
    <>
      <h1 data-heading={heading}>
        <span contentEditable data-heading={heading} onInput={handleInput}>
          {heading}
        </span>
      </h1>
    </>
  );
};

export default Name;
