import { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  className: string;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
