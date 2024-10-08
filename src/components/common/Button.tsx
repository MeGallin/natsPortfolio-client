import React from 'react';

// Define the props for the Button component
interface ButtonProps {
  text?: string;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: Object;
}

const Button: React.FC<ButtonProps> = ({
  text = 'Button',
  color = 'blue',
  onClick,
  disabled = true,
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
  } as React.CSSProperties;

  return (
    <div>
      {' '}
      <button style={buttonStyle} onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </div>
  );
};

export default Button;
