import { FC, HTMLAttributes } from "react";
import Menu from "./Menu";

interface IProps extends HTMLAttributes<HTMLElement> {}

const Sidebar: FC<IProps> = ({ ...props }) => {
  return (
    <aside {...props}>
      <Menu />
    </aside>
  );
};

export default Sidebar;
