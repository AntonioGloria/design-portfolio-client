import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";

const EditProfilePage = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const { username } = user;
  const { avatar } = userData;

  useEffect(() => {
    const getUserData = async (user) => {
      try {
        const res = await userService.getOne(user);
        setUserData(res.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    getUserData(username);
  }, [username])

  return (
    <div>
      <h1>{username} - Edit Profile</h1>
      <img src={avatar} alt={username}/>
    </div>

  )
}

export default EditProfilePage;