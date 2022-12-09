import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import { Container, Nav, NavbarBrand, NavDropdown } from 'react-bootstrap';
import { Navbar as NavBoot } from 'react-bootstrap';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <NavBoot className="navbar-dark" bg="dark" expand="lg">
      <Container>
        <NavBoot.Toggle aria-controls="basic-navbar-nav" />
        <NavBoot.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="navbar-brand" to="/">Portfolios</Link>
            <NavDropdown menuVariant="dark" title="Explore by Media" id="basic-nav-dropdown">
              <Link to='/' className="dropdown-item">Physical</Link>
              <Link to='/' className="dropdown-item">Digital</Link>
              <Link to='/' className="dropdown-item">Photography</Link>
            </NavDropdown>
          </Nav>

          <Nav>
            {isLoggedIn && (
              <NavDropdown menuVariant="dark" title={user && user.name}>
                <Link
                  to="/profile"
                  className="dropdown-item">
                  <i class="fa-sharp fa-solid fa-house-chimney"></i>
                  &emsp;View Profile
                </Link>
                <Link
                  to="/edit-profile"
                  className="dropdown-item">
                  <i className="fa-solid fa-pen-to-square"></i>
                  &emsp;Edit Profile
                </Link>
                {/*<img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" />*/}
                <NavDropdown.Divider/>
                <span className="dropdown-item" onClick={logOutUser}><i class="fa-solid fa-right-from-bracket"></i>&emsp;Logout</span>
              </NavDropdown>
            )}

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
          </Nav>
        </NavBoot.Collapse>
      </Container>
    </NavBoot>
  );
}

export default Navbar;
