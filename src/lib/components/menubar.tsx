import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AppContext } from "../contexts/appcontext";
import useAuthentication from "../hooks/useAuthentication";

interface MenuBarProps {
  onClick?: (menuIndex: number) => void;
  menuItems: MenuItem[];
  selectedItemId: number;
  username: string;
}

const MenuBar = ({
  onClick,
  menuItems,
  selectedItemId,
  username,
}: MenuBarProps) => {
  const [currentMenuId, setCurrentMenuId] = useState<number>(0);
  const { appState, updateAppState } = useContext(AppContext);
  const { signOutUser } = useAuthentication();

  useEffect(() => {
    setCurrentMenuId(selectedItemId);
  }, [selectedItemId]);

  const handleLogout = () => {
    signOutUser();
    updateAppState({ ...appState, isUserLoggedIn: false });
  };

  return (
    <Navbar
      expand="md"
      bg="primary"
      data-bs-theme="dark"
      className="shadow"
      sticky="top"
    >
      <Container fluid>
        <Navbar.Brand href="/">W4R Admin Portal</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {menuItems.map((item, index) => (
              <Nav.Link
                key={item.id}
                active={currentMenuId === menuItems[index].id}
                onClick={() => onClick?.(index)}
                href={item.route}
                // className={
                //   currentMenuId === menuItems[index].id ? "active" : ""
                // }
              >
                {item.icon} {item.label}
              </Nav.Link>
            ))}
          </Nav>
          {appState?.isUserLoggedIn && (
            <Nav className="ms-auto">
              <Nav.Link href="/" onClick={handleLogout}>
                Logout{" "}
                <strong className="text-white">
                  <em>{username ?? "user"}</em>
                </strong>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuBar;
