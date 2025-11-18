import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import cn from "classnames";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  mode?: 'primary' | 'ghost';
  className?: string;
}

const Button: FC<IProps> = ({ children, mode = 'primary', className, ...rest }) => {
  return (
    <button
      className={cn('inline-block box-border px-3 py-2 cursor-pointer text-center rounded-sm text-sm transition duration-300', {
        "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)]": mode === "primary",
        'bg-transparent text-[var(--black)] border border-gray-300 hover:bg-gray-200 active:bg-gray-300': mode === "ghost"
      }, className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
