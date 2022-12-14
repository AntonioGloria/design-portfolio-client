import React from 'react';
import "./style.css";

const UserHeader = (props) => {
  const { username, avatar, coverImg, tagline } = props;

  return (
    <header className="header-main" style={{backgroundImage: `url(${coverImg})`,}}>
      <div className="name-tag d-flex">
        <img className="avatar" src={avatar} alt={username}/>
        <div className="ms-3">
          <h2>{username}</h2>
          <h4>{tagline}</h4>
        </div>
      </div>
    </header>
  )
}

export default UserHeader