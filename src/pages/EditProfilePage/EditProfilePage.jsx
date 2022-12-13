import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const { isLoggedIn, logOutUser, user, setUser } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState("");
  const { username, avatar } = user;
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    try {
      const uploadData = new FormData();
      uploadData.append("imageUrl", e.target.files[0]);
      const res = await userService.uploadImage(uploadData);
      setImageUrl(res.data.fileUrl);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await userService.updateOne(username, {avatar:imageUrl});
      setUser({
        username,
        avatar: imageUrl,
        isLoggedIn,
        logOutUser,
      });
      navigate("/");
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>{username} - Edit Profile</h1>
      <img src={avatar} alt={username}/>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" onChange={handleFileUpload}/>
        </Form.Group>
        <Button variant="primary" type="submit">Update Profile</Button>
      </Form>
    </div>

  )
}

export default EditProfilePage;