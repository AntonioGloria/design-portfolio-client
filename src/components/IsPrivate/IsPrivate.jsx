import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate, useParams } from "react-router-dom";
import artworkService from "../../services/artwork.service";
import Loading from "../Loading/Loading";

function IsPrivate({ children }) {
  const { artworkId } = useParams();
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  const [isArtworkOwner, setIsArtworkOwner] = useState(null);

  useEffect(() => {
    if (artworkId) {
      checkArtworkOwnership(artworkId)
    }
  }, [artworkId])

  const checkArtworkOwnership = async (id) => {
    const response = await artworkService.verifyOwnership(id)
    setIsArtworkOwner(response.data);
  }

  // If the authentication is still loading ⏳
  if (isLoading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    // If the user is not logged in navigate to the login page ❌
    return <Navigate to="/login" />;
  }

  if (isArtworkOwner === false) {
    // If trying to edit another user's artwork, send user to home page ❌
    return <Navigate to={`/artworks/${artworkId}`} />;
  }

  // If the user is logged in, allow to see the page ✅
  return children;
}

export default IsPrivate;
