import React, { Dispatch, SetStateAction } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

interface MenuItem {
  id: number;
  label: string;
  icon: JSX.Element;
  route: string;
}

interface MenuBarProps {
  onClick: Dispatch<SetStateAction<number>>;
  menuItems: MenuItem[];
  selectedItemId: number;
}

const MenuBar = ({ onClick, menuItems, selectedItemId }: MenuBarProps) => {
  return (
    <Navbar expand="md" bg="primary" data-bs-theme="dark" className="shadow" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#home">W4R Admin Portal</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {menuItems.map((item, index) => (
              <Nav.Link
                key={index}
                onClick={() => onClick(index)}
                href={item.route}
                className={selectedItemId === item.id ? "active" : ""}
              >
                {item.icon} {item.label}
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link>
              Logout{" "}
              <strong className="text-white">
                <em>Mark Otto</em>
              </strong>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuBar;
