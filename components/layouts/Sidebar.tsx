import { FC, HTMLAttributes } from "react";
import Menu from "./Menu";
import logo from "../../public/logo.svg";
import Image from "next/image";
import cn from "classnames";

interface IProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}

const Sidebar: FC<IProps> = ({ className, ...props }) => {
  return (
    <aside className={cn(className, 'grid content-start gap-5')} {...props}>
      <Image src={logo} className="mt-8" alt="" />
      <div>поиск</div>
      <Menu />
    </aside>
  );
};

export default Sidebar;
