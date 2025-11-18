import { FC } from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  color?: 'ghost' | 'red' | 'green' | 'gray' | 'primary';
  href?: string;
}

const Tag: FC<IProps> = ({ children, className, size = 'small', color = 'ghost', href, ...rest }) => {
  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-2 py-1',
    large: 'text-base px-4 py-2',
  };

  const colorClasses = {
    ghost: 'bg-transparent text-[var(--black)] border border-gray-300',
    red: 'bg-red-500 text-white',
    green: 'bg-[var(--green)] text-white',
    gray: 'bg-gray-500 text-white',
    primary: 'text-[var(--primary)] text-[var(--primary)] border border-[var(--primary)] bg-[#e7dfff]',
  };

  return (
    <div
      className={`inline-block box-border mr-1 rounded-2xl ${sizeClasses[size]} ${colorClasses[color]} ${className} ${href ? 'cursor-pointer' : ''}`} 
      {...rest}
      onClick={href ? () => window.location.href = href : undefined}
    >
      {children}
    </div>
  );
};

export default Tag;
