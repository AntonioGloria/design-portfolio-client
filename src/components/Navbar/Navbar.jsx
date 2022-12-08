import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import { Container, Nav, NavDropdown } from 'react-bootstrap';
import { Navbar as NavBoot } from 'react-bootstrap';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <NavBoot bg="light" expand="lg">
      <Container>
        <NavBoot.Toggle aria-controls="basic-navbar-nav" />
        <NavBoot.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Link className="nav-link" to="/">Portfolios</Link>

            <NavDropdown title="Explore by Media" id="basic-nav-dropdown">
              <Link to='/' className="dropdown-item">Physical</Link>
              <Link to='/' className="dropdown-item">Digital</Link>
              <Link to='/' className="dropdown-item">Photography</Link>
            </NavDropdown>
          </Nav>

          <Nav>
            {isLoggedIn && (
              <NavDropdown title={user && user.name}>
                <Link className="dropdown-item" to="/profile">View Profile</Link>
                <Link className="dropdown-item" to="/edit-profile">Edit Profile</Link>
                {/*<img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" />*/}
                <NavDropdown.Divider/>
                <span className="dropdown-item" onClick={logOutUser}>Logout</span>
              </NavDropdown>
            )}

            {!isLoggedIn && (
              <>
                <Link className="nav-link" to="/signup">Sign Up</Link>
                <Link className="nav-link" to="/login">Login</Link>
              </>
            )}
          </Nav>
        </NavBoot.Collapse>
      </Container>
    </NavBoot>
  );
}

export default Navbar;
