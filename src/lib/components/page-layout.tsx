import React, { FC, useState } from "react";
import { Container } from "react-bootstrap";
import { FaOpencart, FaFileInvoiceDollar, FaUsers } from "react-icons/fa";
import MenuBar from "./menubar";

interface PageLayoutProps {
  isShowSideMenu?: boolean;
  children?: React.ReactNode;
  selectedMenuId: number;
  menuItems: MenuItem[];
}

const PageLayout: FC<PageLayoutProps> = ({
  isShowSideMenu = false,
  children,
  selectedMenuId,
  menuItems,
}: PageLayoutProps) => {
  // const [selectedMenuId, setSelectedMenuId] = useState<number>(APP_MENU[0].id);

  return (
    <>
      <MenuBar
        menuItems={menuItems}
        onClick={(menuIndex) => {
          //setSelectedMenuId(APP_MENU[menuIndex].id);
        }}
        selectedItemId={selectedMenuId}
      />
      <Container className="pt-3">{children}</Container>
    </>
  );
};

export default PageLayout;
