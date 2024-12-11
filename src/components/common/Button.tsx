import React from 'react';

// Define the props for the Button component
interface ButtonProps {
  text?: string;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties; // Use React.CSSProperties for better type safety
  type?: 'button' | 'submit' | 'reset'; // Add the type property
}

const Button: React.FC<ButtonProps> = ({
  text = 'Button',
  color = 'blue',
  onClick,
  disabled = true,
  style,
  type = 'button', // Default to 'button'
}) => {
  const buttonStyle = {
    backgroundColor: color,
    width: '100%',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    ...style, // Merge user-provided styles
  } as React.CSSProperties;

  return (
    <div>
      <button
        style={buttonStyle}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
