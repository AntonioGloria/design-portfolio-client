import "./ProfilePage.css";
import { useState, useEffect } from "react";
import userService from "../../services/user.service";
import { useParams } from "react-router-dom";
import UserHeader from "../../components/UserHeader";
import UserMainTabs from "../../components/UserMainTabs";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function ProfilePage() {
  const { username } = useParams();
  const [details, setDetails] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await userService.getOne(username);
        setDetails(res.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    getUserData();
  }, [username]);

  return (
    <>
    {!details ?
      <NotFoundPage/> :
    <>
      <UserHeader
        username={username}
        avatar={details?.avatar}
        coverImg={details?.coverImg}
        tagline={details?.tagline}
      />
      <UserMainTabs
        username={username}
        bio={details?.bio}
        email={details?.email}
        createdAt={details?.createdAt}
        ownArtworks={details?.ownArtworks}
        ownAlbums={details?.ownAlbums}
        favArtworks={details?.favArtworks}
        favCollections={details?.favCollections}
      />
    </>
    }
    </>
  );
}

export default ProfilePage;
