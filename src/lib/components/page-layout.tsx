import React, { FC } from "react";
import { Container } from "react-bootstrap";
import { FaOpencart, FaFileInvoiceDollar, FaUsers, FaHome } from "react-icons/fa";
import MenuBar from "./menubar";

export interface MenuItem {
  id: number;
  label: string;
  icon: JSX.Element;
  route: string;
}

const APP_MENU: MenuItem[] = [
  {
    id: 1,
    label: "Orders",
    icon: <FaOpencart />,
    route: "/orders",
  },
  {
    id: 2,
    label: "Invoices",
    icon: <FaFileInvoiceDollar />,
    route: "/invoices",
  },
  {
    id: 3,
    label: "Users",
    icon: <FaUsers />,
    route: "/members",
  },
];

interface PageLayoutProps {
  isShowSideMenu?: boolean;
  children?: React.ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ isShowSideMenu = false, children }: PageLayoutProps) => {
  return (
    <>
      <MenuBar menuItems={APP_MENU} onClick={() => {}} selectedItemId={1} />
      <Container className="pt-3">{children}</Container>
    </>
  );
};

export default PageLayout;
