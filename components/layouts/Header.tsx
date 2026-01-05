import cn from "classnames";
import { FC, HTMLAttributes, useState } from "react";
import logo from "../../public/logo.svg";
import Image from "next/image";
import ButtonIcon from "../UI/ButtonIcon";
import MobileMenu from "./MobileMenu";
import { AnimatePresence } from "framer-motion";

interface IProps extends HTMLAttributes<HTMLElement> {}

const Header: FC<IProps> = ({ className,...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={cn("flex justify-between items-center", className)} {...props}>
      <Image src={logo} className="mt-7 ml-1.5" alt="" />
      <ButtonIcon icon="menu" onClick={() => setIsMenuOpen(true)} mode="white" className="mt-8" />

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            isMenuOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
