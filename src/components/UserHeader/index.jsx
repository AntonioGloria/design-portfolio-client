import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

const UserHeader = (props) => {
  const { username, avatar, coverImg, tagline } = props;

  return (
    <header
      className="header-main"
      style={{
        backgroundImage: `url(${coverImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      <Link to={`/${username}`} className="name-tag d-flex text-decoration-none link-light">
        <img className="avatar" src={avatar} alt={username}/>
        <div className="ms-3">
          <h2>{username}</h2>
          <h4>{tagline}</h4>
        </div>
      </Link>
    </header>
  )
}

export default UserHeader