import { FC, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

interface IProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  tag: 'h1' | 'h2' | 'h3';
  className?: string;
}

const Title: FC<IProps> = ({ children, tag, className, ...props }) => {
  switch (tag) {
    case 'h1':
      return <h1 className={cn("text-2xl font-medium", className)} {...props}>{children}</h1>
    case 'h2':
      return <h2 className={cn("text-xl font-medium", className)} {...props}>{children}</h2>
    case 'h3':
      return <h3 className={cn("text-lg font-medium", className)} {...props}>{children}</h3>
    default:
      return <h1 className={cn("text-2xl font-medium", className)} {...props}>{children}</h1>
  }
};

export default Title;
