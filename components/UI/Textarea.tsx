import { forwardRef, TextareaHTMLAttributes } from "react";
import cn from "classnames";
import { FieldError } from "react-hook-form";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError;
}

const Textarea = forwardRef<HTMLTextAreaElement, IProps>(({ error, className, rows = 3, ...rest }, ref) => {
  return (
    <div className={cn(className, 'relative')}>
      <textarea
        {...rest}
        ref={ref}
        className={cn('px-4 py-2 text-[var(--black)] outline-[var(--primary)] bg-white shadow-xs rounded-sm resize-none w-full', {
          'border border-red-500': !!error
        })}
        rows={rows}
      ></textarea>

      <span className="absolute -bottom-4 left-0 text-red-500">
        {!!error && error.message}
      </span>
    </div>
  )
})

export default Textarea;
