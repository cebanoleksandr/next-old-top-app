import { FC, TextareaHTMLAttributes } from "react";
import cn from "classnames";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: FC<IProps> = ({ className, rows = 3, ...rest }) => {
  return (
    <textarea
      { ...rest }
      className={cn('px-4 py-2 text-[var(--black)] outline-[var(--primary)] bg-white shadow-xs rounded-sm resize-none', className)}
      rows={rows}
    ></textarea>
  )
}

export default Textarea;
