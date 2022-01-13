import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { RootState } from "../reduxStore";
import { ActionType, ActionProps } from "../action-types/actionTypes";
import { logout } from "../context/userContext";

// interface{

// }
const Header: React.FC = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state: RootState)=>{
    return state.userLogin
  })
  const { userInfo } = userLogin

  
  const logoutHandler = () => {
    dispatch(logout());
    
  }
  return (
    <header>
      <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>asake shop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart/:id">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"> </i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>logout</NavDropdown.Item>
          </NavDropdown>      
) :  <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"> </i>Sign in
                </Nav.Link>
              </LinkContainer>}
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
