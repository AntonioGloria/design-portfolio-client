import "./Navbar.css";
import React from 'react';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import { Navbar as NavBoot, Container, Nav, NavDropdown } from 'react-bootstrap';
import JutsuLogo from "../../assets/img/JutsuLogo.svg";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <NavBoot sticky="top" variant="dark" bg="dark" expand="lg">
      <Container fluid={true}>
        <NavBoot.Toggle aria-controls="basic-navbar-nav"/>
        <NavBoot.Collapse id="basic-navbar-nav" className="d-flex justify-content-between">
          <Nav>
            <Link
              to="/"
              className="navbar-brand">
              <img src={JutsuLogo} style={{height:"4vh"}} alt="jutsu-logo"/>
            </Link>
            <NavDropdown menuVariant="dark" title="Explore by Media" id="basic-nav-dropdown">
              <Link to='/' className="dropdown-item">Physical</Link>
              <Link to='/' className="dropdown-item">Digital</Link>
              <Link to='/' className="dropdown-item">Photography</Link>
            </NavDropdown>
          </Nav>

          <Nav>
            {!isLoggedIn && (
              <>
                <Link
                  to="/signup"
                  className="btn bg-primary me-4">
                  <i className="fa-solid fa-user-plus"></i>
                  &emsp;Sign Up
                </Link>
                <Link
                  to="/login"
                  className="btn bg-secondary">
                  <i className="fa-solid fa-right-to-bracket"></i>
                  &emsp;Log In
                </Link>
              </>
            )}

            {isLoggedIn && (
              <NavDropdown menuVariant="dark" title={user &&
                <>
                  {user.username}&emsp;
                  <img src={user.avatar} style={{ width: 30, height: 30, borderRadius: 25}} alt="avatar"/>&emsp;
                </>
              }>
                <Link
                  to={`/${user.username}`}
                  className="dropdown-item">
                  <i className="fa-solid fa-solid fa-user"></i>
                  &emsp;View Profile
                </Link>
                <Link
                  to={`/${user.username}/edit-profile`}
                  className="dropdown-item">
                  <i className="fa-solid fa-pen-to-square"></i>
                  &emsp;Edit Profile
                </Link>
                <NavDropdown.Divider/>
                <span className="dropdown-item"
                  onClick={logOutUser}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  &emsp;Logout
                </span>
              </NavDropdown>
            )}
          </Nav>
        </NavBoot.Collapse>
      </Container>
    </NavBoot>
  );
}

export default Navbar;
