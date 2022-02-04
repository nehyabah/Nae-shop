// import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { RootState } from "../reduxStore";
import SearchBox from "./SearchBox";

import { logout } from "../context/userContext";

// interface{

// }
const Header: React.FC = () => {
  const dispatch = useDispatch();
  const push = useNavigate();
  const userLogin = useSelector((state: RootState) => {
    return state.userLogin;
  });
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    push("/login");
  };
  return (
    <header>
      <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>asake shop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Route render={(push) => <SearchBox push={ push}/> }/> */}
            <SearchBox/>
            <Nav className="ms-auto">
              <LinkContainer to="/cart/:id">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"> </i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"> </i>Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo?.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
