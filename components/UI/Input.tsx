import { forwardRef, InputHTMLAttributes } from "react";
import cn from "classnames";
import { FieldError } from "react-hook-form";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, IProps>(({ error, className, ...rest }, ref) => {
  return (
    <div className={cn(className, 'relative')}>
      <input
        ref={ref}
        { ...rest }
        className={cn('px-4 py-2 text-[var(--black)] outline-[var(--primary)] bg-white shadow-xs rounded-sm w-full', {
          'border border-red-500': !!error
        })}
      />

      <span className="absolute -bottom-5 left-0 text-red-500">
        {!!error && error.message}
      </span>
    </div>
  )
})

export default Input;
