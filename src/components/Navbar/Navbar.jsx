import "./Navbar.css";
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import { Navbar as NavBoot, Container, Nav, NavDropdown } from 'react-bootstrap';
import JutsuLogo from "../../assets/img/JutsuLogo.svg";

function Navbar() {
  const navigate = useNavigate();
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const navLogout = () => {
    logOutUser();
    navigate("/");
  }

  return (
    <NavBoot sticky="top" variant="dark" bg="dark" expand="lg" className="border-bottom border-secondary border-opacity-25">
      <Container fluid={true}>
        <NavBoot.Toggle aria-controls="basic-navbar-nav"/>
        <NavBoot.Collapse id="basic-navbar-nav" className="d-flex justify-content-between">
          <Nav>
            <Link
              to="/"
              className="navbar-brand">
              <img src={JutsuLogo} style={{height:"4vh"}} alt="jutsu-logo"/>
            </Link>

            <NavDropdown
              menuVariant="dark"
              className="ms-3 me-3"
              title={
                <>
                  <i className="fa-solid fa-paintbrush"></i>
                  &nbsp;&nbsp;Physical Media
                </>
              }
            >
              <Link to='/artworks?category=physicalMedia' className="dropdown-item">All</Link>
              <Link to='/artworks?category=physicalMedia&medium=physDrawing' className="dropdown-item">Drawing</Link>
              <Link to='/artworks?category=physicalMedia&medium=physPainting' className="dropdown-item">Painting</Link>
              <Link to='/artworks?category=physicalMedia&medium=physSculpture' className="dropdown-item">Sculpture</Link>
            </NavDropdown>

            <NavDropdown
              menuVariant="dark"
              className="ms-3 me-3"
              title={
                <>
                  <i className="fa-solid fa-computer"></i>
                  &nbsp;&nbsp;Digital Media
                </>
              }
            >
              <Link to='/artworks?category=digitalMedia' className="dropdown-item">All</Link>
              <Link to='/artworks?category=digitalMedia&medium=digiDrawing' className="dropdown-item">Digital Drawing</Link>
              <Link to='/artworks?category=digitalMedia&medium=digiPainting' className="dropdown-item">Digital Painting</Link>
              <Link to='/artworks?category=digitalMedia&medium=digi3DArt' className="dropdown-item">3D Art</Link>
            </NavDropdown>

            <NavDropdown
              menuVariant="dark"
              className="ms-3 me-3"
              title={
                <>
                  <i className="fa-solid fa-camera"></i>
                  &nbsp;&nbsp;Photography
                </>
              }
            >
              <Link to='/artworks?category=photography' className="dropdown-item">All</Link>
              <Link to='/artworks?category=photography&medium=photoPortrait' className="dropdown-item">Portrait</Link>
              <Link to='/artworks?category=photography&medium=photoNature' className="dropdown-item">Nature</Link>
              <Link to='/artworks?category=photography&medium=photoMacro' className="dropdown-item">Macro</Link>
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
                  to={`/artworks/create`}
                  className="dropdown-item">
                  <sup><i className="fa-solid fa-plus"></i></sup>
                  <sub><i className="fa-solid fa-image"></i></sub>
                  &emsp;New Project
                </Link>
                <Link
                  to={`/${user.username}`}
                  className="dropdown-item">
                  <i className="fa-solid fa-house"></i>
                  &emsp;View Profile
                </Link>
                <Link
                  to={"/edit-profile"}
                  className="dropdown-item">
                  <i className="fa-solid fa-pen-to-square"></i>
                  &emsp;Edit Profile
                </Link>
                <NavDropdown.Divider/>
                <button className="dropdown-item"
                  onClick={navLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  &emsp;Logout
                </button>
              </NavDropdown>
            )}
          </Nav>
        </NavBoot.Collapse>
      </Container>
    </NavBoot>
  );
}

export default Navbar;
