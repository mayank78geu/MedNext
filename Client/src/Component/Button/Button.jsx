import { IoSearchOutline } from "react-icons/io5";

const Button = ({ text,children, onClick, className = "", ...props }) => {
  return (
    <button onClick={onClick}
      className={`hover:text-sky-500 text-left cursor-pointer ${className}`}
      {...props}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;