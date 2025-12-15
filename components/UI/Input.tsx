import { FC, InputHTMLAttributes } from "react";
import cn from "classnames";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<IProps> = ({ className, ...rest }) => {
  return (
    <input
      { ...rest }
      className={cn('px-4 py-2 text-[var(--black)] outline-[var(--primary)] bg-white shadow-xs rounded-sm', className)}
    />
  )
}

export default Input;
