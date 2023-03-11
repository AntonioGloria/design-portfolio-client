import "./style.css";

const UserHeader = (props) => {
  const { username, avatar, coverImg, tagline } = props;

  return (
    <header
      className="header-main" style={{backgroundImage: `url(${coverImg})`}}>
      <div className="name-tag">
        <img className="avatar" src={avatar} alt={username}/>
        <div className="name-tag-text d-inline-block ms-3">
          <h2>{username}</h2>
          <h4>{tagline}</h4>
        </div>
      </div>
    </header>
  )
}

export default UserHeader;