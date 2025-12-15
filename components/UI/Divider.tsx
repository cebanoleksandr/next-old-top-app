import { FC, HTMLAttributes } from "react";
import cn from "classnames";

interface IProps extends HTMLAttributes<HTMLHRElement> {}

const Divider: FC<IProps> = ({ className, ...rest}) => {
  return (
    <hr className={cn(className, 'w-full h-[1px] border-none bg-[var(--gray-light)] my-5')} { ...rest } />
  )
}

export default Divider;
