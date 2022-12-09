import "./ProfilePage.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function ProfilePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div>
      <h1>Profile page</h1>
      <h3>Hello {isLoggedIn && user.name}</h3>
    </div>
  );
}

export default ProfilePage;
