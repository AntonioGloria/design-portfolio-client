import "./ProfilePage.css";
import { useState, useEffect } from "react";
import userService from "../../services/user.service";
import { useParams } from "react-router-dom";
import UserHeader from "../../components/UserHeader";

function ProfilePage() {
  const { username } = useParams();
  const [userData, setUserData] = useState([]);
  const {
    avatar,
    coverImg,
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
    <UserHeader username={username} avatar={avatar} coverImg={coverImg}/>
  );
}

export default ProfilePage;
