import { FC, useEffect, useRef } from "react";
import cn from "classnames";
import { HTMLMotionProps, motion, Variants } from "framer-motion";
import ButtonIcon from "../UI/ButtonIcon";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

interface IProps extends HTMLMotionProps<"div"> {
  onClose: () => void;
  isMenuOpen: boolean;
}

const MobileMenu: FC<IProps> = ({ className, onClose, isMenuOpen, ...props }) => {
  const pathname = usePathname();
  const savedPathname = useRef(pathname);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    visible: {
      opacity: 1,
      height: "100vh",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (savedPathname.current !== pathname) {
      onClose();
      savedPathname.current = pathname;
    }
  }, [pathname, onClose]);

  useEffect(() => {
    if (isMenuOpen) {
      savedPathname.current = pathname;
    }
  }, [isMenuOpen, pathname]);

  return (
    <motion.div
      className={cn("fixed top-0 left-0 bottom-0 right-0 bg-white overflow-hidden z-50", className)}
      {...props}
      variants={variants}
      initial="hidden"
      animate={isMenuOpen ? "visible" : "hidden"}
      exit="hidden"
    >
      <div className="overflow-auto h-screen pb-5 scrollbar-md">
        <Sidebar className="mx-7.5" />
      </div>

      <ButtonIcon
        icon="close"
        onClick={onClose}
        mode="white"
        className="fixed top-8 right-[39px]"
      />
    </motion.div>
  );
};

export default MobileMenu;
