import { FC, HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLElement> {}

const Header: FC<IProps> = ({ ...props }) => {
  return (
    <header {...props}>
      <h1>Welcome to My Website</h1>
    </header>
  );
};

export default Header;
