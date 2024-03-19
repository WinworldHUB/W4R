import React, { FC } from "react";
import { Container } from "react-bootstrap";
import MenuBar from "./menubar";

interface PageLayoutProps {
  isShowSideMenu?: boolean;
  children?: React.ReactNode;
  selectedMenuId: number;
  menuItems: MenuItem[];
  username: string;
}

const PageLayout: FC<PageLayoutProps> = ({
  isShowSideMenu = false,
  children,
  selectedMenuId,
  menuItems,
  username,
}: PageLayoutProps) => {
  return (
    <>
      <MenuBar
        menuItems={menuItems}
        selectedItemId={selectedMenuId}
        username={username}
      />
      <Container fluid className="pt-3 w-90">
        {children}
      </Container>
    </>
  );
};

export default PageLayout;
