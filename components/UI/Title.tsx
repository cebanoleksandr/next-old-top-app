import { FC, HTMLAttributes, ReactNode } from "react";

interface IProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  tag: 'h1' | 'h2' | 'h3';
}

const Title: FC<IProps> = ({ children, tag, ...props }) => {
  switch (tag) {
    case 'h1':
      return <h1 className="text-2xl font-medium" {...props}>{children}</h1>
    case 'h2':
      return <h2 className="text-xl font-medium" {...props}>{children}</h2>
    case 'h3':
      return <h3 className="text-lg font-medium" {...props}>{children}</h3>
    default:
      return <h1 className="text-2xl font-medium" {...props}>{children}</h1>
  }
};

export default Title;
