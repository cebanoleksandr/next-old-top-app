import { FC, ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
import "./MainLayout.css";
import Up from "@/components/UI/Up";

interface IProps {
  children: ReactNode;
}

const MainLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="wrapper">
      <Header className="header md:hidden" />
      <Sidebar className="sidebar" />
      <main className="main">{children}</main>
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
