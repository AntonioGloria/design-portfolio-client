import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { Navbar as NavBoot, Nav, NavDropdown } from 'react-bootstrap';
import categoryMedia from "../../assets/categoryMedia.json";
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
      <NavBoot.Toggle aria-controls="basic-navbar-nav"/>
      <NavBoot.Collapse id="basic-navbar-nav" className="d-flex justify-content-between">
        <Nav>
          <Link to="/" className="navbar-brand mx-3">
            <img src={JutsuLogo} style={{height:"4vh"}} alt="jutsu-logo"/>
          </Link>

          {categoryMedia.slice(1).map(category =>
            <NavDropdown key={category.value} menuVariant="dark" className="mx-3" title={<span><i className={`${category.icon} me-2`}/>{category.label}</span>}>
              <Link to={`/artworks?category=${category.value}`} className="dropdown-item">All</Link>
              {category.media.map(medium =>
                <Link key={medium.value} to={`/artworks?category=${category.value}&medium=${medium.value}`} className="dropdown-item">
                  {medium.label}
                </Link>
              )}
            </NavDropdown>
          )}
        </Nav>

        <Nav className="me-3">
          {!isLoggedIn && (
            <>
              <Link to="/signup" className="btn bg-primary me-4">
                <i className="fa-solid fa-user-plus me-2"/>Sign Up
              </Link>
              <Link to="/login" className="btn bg-secondary">
                <i className="fa-solid fa-right-to-bracket me-2"/>Log In
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
              <Link to={`/artworks/create`} className="dropdown-item">
                <sup><i className="fa-solid fa-plus"></i></sup>
                <sub><i className="fa-solid fa-image"></i></sub>
                &emsp;New Project
              </Link>
              <Link to={`/${user.username}`} className="dropdown-item">
                <i className="fa-solid fa-house"></i>
                &emsp;View Profile
              </Link>
              <Link to={"/edit-profile"} className="dropdown-item">
                <i className="fa-solid fa-pen-to-square"></i>
                &emsp;Edit Profile
              </Link>
              <NavDropdown.Divider/>
              <button className="dropdown-item" onClick={navLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                &emsp;Logout
              </button>
            </NavDropdown>
          )}
        </Nav>
      </NavBoot.Collapse>
    </NavBoot>
  );
}

export default Navbar;
