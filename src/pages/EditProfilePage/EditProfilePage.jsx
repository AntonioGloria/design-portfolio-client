import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import { Button, Form, FormGroup, FormLabel, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const { isLoggedIn, logOutUser, user, setUser } = useContext(AuthContext);
  const { username, avatar, coverImg } = user;

  const [avatarUrl, setAvatarUrl] = useState(avatar);
  const [coverUrl, setCoverUrl] = useState(coverImg);

  const navigate = useNavigate();

  const handleAvatarUpload = async (e) => {
    try {
      const uploadData = new FormData();
      uploadData.append("imageUrl", e.target.files[0]);
      const res = await userService.uploadImage(uploadData);
      setAvatarUrl(res.data.fileUrl);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleCoverUpload = async (e) => {
    try {
      const uploadData = new FormData();
      uploadData.append("imageUrl", e.target.files[0]);
      const res = await userService.uploadImage(uploadData);
      setCoverUrl(res.data.fileUrl);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await userService.updateOne(username, {avatar:avatarUrl, coverImg: coverUrl});

      setUser({
        username,
        avatar: avatarUrl,
        coverImg: coverUrl,
        isLoggedIn,
        logOutUser,
      });

      navigate(`/${username}`);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="d-flex align-items-center"
      style={{height: "90vh"}}
    >
      <Card className="w-50 m-auto text-center shadow">
        <Card.Body>
        <h1>{username} - Edit Profile</h1>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="d-flex">
            <Card className="w-25 p-3">
              <FormGroup controlId="avatarFile">
                <FormLabel>Change Avatar</FormLabel>
                <br/>
                <img src={avatarUrl} alt="avatar-img" style={{width:"200px", objectFit:"cover"}}/>
                <FormLabel className="text-muted">200px × 200px</FormLabel>
                <Form.Control type="file" onChange={handleAvatarUpload}/>
              </FormGroup>
            </Card>

            <Card className="w-75 p-3 d-flex flex-column justify-content-center">
              <FormGroup controlId="coverFile">
                <FormLabel>Change Cover Image</FormLabel>
                <img src={coverUrl} alt="cover-img" style={{width:"100%"}}/>
                <FormLabel className="text-muted">1920px × 360px</FormLabel>
                <Form.Control type="file" onChange={handleCoverUpload} className="mt-4"/>
              </FormGroup>
            </Card>
          </div>
          <Button variant="primary" type="submit">Update Profile</Button>
        </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default EditProfilePage;