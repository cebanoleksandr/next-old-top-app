import { FC, KeyboardEvent, ReactNode, useRef, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import "./MainLayout.css";
import Up from "@/components/UI/Up";
import cn from "classnames";

interface IProps {
  children: ReactNode;
}

const MainLayout: FC<IProps> = ({ children }) => {
  const [isSkipLinkVisible, setIsSkipLinkVisible] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      bodyRef.current?.focus();               
    }

    setIsSkipLinkVisible(false);
  };

  return (
    <div className="wrapper">
      <a
        href="" 
        tabIndex={1} 
        className={cn("block fixed left-25 top-0 overflow-hidden h-0 bg-[var(--primary)] text-white", {
          "h-auto": isSkipLinkVisible
        })}
        onFocus={() => setIsSkipLinkVisible(true)}
        onBlur={() => setIsSkipLinkVisible(false)}
        onKeyDown={skipContentAction} 
      >
        Сразу к содержанию
      </a>

      <div className="md:hidden">
        <Header className="header" />
      </div>

      <Sidebar className="sidebar" />

      <main
        className="main"
        ref={bodyRef}
        tabIndex={0}
      >
        {children}
      </main>
        
      <Footer className="footer" />
      <Up />
    </div>
  );
};

export const withMainLayout = <P extends object>(Component: FC<P>) => {
  const WithMainLayout: FC<P> = (props) => {
    return (
      <MainLayout>
        <Component {...props} />
      </MainLayout>
    );
  };

  return WithMainLayout;
};
