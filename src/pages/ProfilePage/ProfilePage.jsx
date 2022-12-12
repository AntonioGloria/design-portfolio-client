import "./ProfilePage.css";
import { useState, useEffect } from "react";
import userService from "../../services/user.service";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { username } = useParams();
  const [userData, setUserData] = useState([]);
  const {
    avatar,
    ownArtworks,
    ownAlbums,
    likedArtworks,
    likedCollections
  } = userData;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await userService.getOne(username);
        setUserData(res.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    getUserData();
  }, [username]);

  return (
    <div>
      <img src={avatar} style={{borderRadius:"50%"}} alt={username}/>
      <h1>{username}</h1>
    </div>
  );
}

export default ProfilePage;
