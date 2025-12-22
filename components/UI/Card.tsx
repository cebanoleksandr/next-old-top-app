import { FC, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color?: 'white' | 'blue';
}

const Card: FC<IProps> = ({ children, color = 'white', className, ...rest }) => {
  return (
    <div
      className={cn('shadow-sm rounded-sm', className, {
        'bg-blue-50': color === 'blue',
        'bg-white': color === 'white'
      })}
      { ...rest }
    >
      {children}
    </div>
  )
}

export default Card;
