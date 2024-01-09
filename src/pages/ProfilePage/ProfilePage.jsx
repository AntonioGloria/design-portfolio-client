import "./ProfilePage.css";
import { useState, useEffect } from "react";
import userService from "../../services/user.service";
import { useParams } from "react-router-dom";
import UserHeader from "../../components/UserHeader";
import UserMainTabs from "../../components/UserMainTabs";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Loading from "../../components/Loading/Loading";

function ProfilePage() {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await userService.getOne(username);
        setDetails(res.data);
        setIsLoading(false);
      }
      catch (err) {
        console.log(err);
      }
    }
    getUserData();
  }, [username]);

  if (isLoading) {
    return <Loading/>
  }

  if (!details) {
    return <NotFoundPage/>
  }

  return (
    <>
      <UserHeader
        username={username}
        avatar={details.avatar}
        coverImg={details.coverImg}
        tagline={details.tagline}
      />
      <UserMainTabs
        username={username}
        bio={details.bio}
        email={details.email}
        createdAt={details.createdAt}
        ownArtworks={details.ownArtworks}
        ownAlbums={details.ownAlbums}
        favArtworks={details.favArtworks}
        favCollections={details.favCollections}
      />
    </>
  );
}

export default ProfilePage;
