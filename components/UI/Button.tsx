import { FC, ReactNode } from "react";
import cn from "classnames";
import { HTMLMotionProps, motion } from "framer-motion";

interface IProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  mode?: 'primary' | 'ghost';
  className?: string;
}

const Button: FC<IProps> = ({ children, mode = 'primary', className, ...rest }) => {
  return (
    <motion.button
      className={cn(className, 'box-border px-3 py-2 cursor-pointer text-center rounded-sm text-sm transition duration-300', {
        "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)]": mode === "primary",
        'bg-transparent text-[var(--black)] border border-gray-300 hover:bg-gray-200 active:bg-gray-300': mode === "ghost"
      })}
      {...rest}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
