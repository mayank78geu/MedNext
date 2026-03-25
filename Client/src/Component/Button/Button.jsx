// const Button = ({ text, className = "" }) => {
//   return (
//     <button
//       className={`hover:text-sky-500 text-left cursor-pointer ${className}`}
//     >
//       {text}
//     </button>
    
//   );
// };

// export default Button;
import { IoSearchOutline } from "react-icons/io5";

const Button = ({ text,children, className = "", ...props }) => {
  return (
    <button
      className={`hover:text-sky-500 text-left cursor-pointer ${className}`}
      {...props}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;