import React from 'react';

// Define the props for the Input component
interface InputProps {
  type?: string;
  value?: string | number;
  placeholder?: string;
  name?: string;
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  placeholder,
  name,
  id,
  checked,
  disabled = false,
  onChange,
  onBlur,
  onFocus,
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      name={name}
      id={id}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      style={{
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        margin: '5px 0',
        width: '100%',
      }}
    />
  );
};

export default Input;
