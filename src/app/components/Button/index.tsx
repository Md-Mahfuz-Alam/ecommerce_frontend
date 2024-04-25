import React from "react";

interface MyButtonProps {
  children: string;
  onClick?: () => void;
  className: string;
}

const Button: React.FC<MyButtonProps> = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;

