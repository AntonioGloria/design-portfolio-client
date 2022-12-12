import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const { username } = useParams();

  /*console.log("param: ",username);
  console.log("auth: ",user.username);*/

  // If the authentication is still loading ⏳
  if (isLoading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    // If the user is not logged in navigate to the login page ❌
    return <Navigate to="/login" />;
  }

  if (username !== user.username) {
    // If trying to navigate to another user's edit page, send user to home page ❌
    return <Navigate to="/" />;
  }
  // If the user is logged in, allow to see the page ✅
  return children;
}

export default IsPrivate;
