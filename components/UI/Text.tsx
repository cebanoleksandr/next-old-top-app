import { FC } from "react";

interface IProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const Text: FC<IProps> = ({ children, size = 'small', className, ...rest }) => {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <p className={`${sizeClasses[size]} ${className}`} {...rest}>
      {children}
    </p>
  );
};

export default Text;
