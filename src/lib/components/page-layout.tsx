import React, { FC, useContext, useState } from "react";
import { Container } from "react-bootstrap";
import MenuBar from "./menubar";
import { AppContext } from "../contexts/appcontext";
import useAuthentication from "../hooks/useAuthentication";
import SignIn from "../../pages/signin";

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
  return (
    <>
      <MenuBar menuItems={menuItems} selectedItemId={selectedMenuId} />
      <Container fluid className="pt-3 w-90">
        {children}
      </Container>
    </>
  );
};

export default PageLayout;
