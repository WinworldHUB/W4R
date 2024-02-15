import React, { FC } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FaOpencart, FaFileInvoiceDollar } from "react-icons/fa6";
import MenuBar from "./menubar";

const APP_MENU: MenuItem[] = [
  {
    id: 1,
    label: "Orders",
    icon: <FaOpencart />,
  },
  {
    id: 2,
    label: "Invoices",
    icon: <FaFileInvoiceDollar />,
  },
];

interface PageLayoutProps {
  isShowSideMenu?: boolean;
  children?: React.ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({
  isShowSideMenu = false,
  children,
}: PageLayoutProps) => {
  return (
    <>
      <MenuBar menuItems={APP_MENU} onClick={() => {}} selectedItemId={1} />
      <Container className="pt-3">{children}</Container>
    </>
  );
};

export default PageLayout;
