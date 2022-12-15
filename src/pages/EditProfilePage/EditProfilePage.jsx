import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const { isLoggedIn, logOutUser, user, setUser } = useContext(AuthContext);
  const { username, avatar, coverImg, bio, tagline } = user;

  const [avatarUrl, setAvatarUrl] = useState(avatar);
  const [coverUrl, setCoverUrl] = useState(coverImg);
  const [newTagline, setNewTagline] = useState(tagline);
  const [newBio, setNewBio] = useState(bio);

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
      await userService.updateOne(username, {
        avatar: avatarUrl,
        coverImg: coverUrl,
        tagline: newTagline,
        bio: newBio
      });

      setUser({
        username,
        avatar: avatarUrl,
        coverImg: coverUrl,
        tagline: newTagline,
        bio: newBio,
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
      <Card className="w-25 m-auto text-center shadow">
        <Card.Header>
          <h2>Edit Profile</h2>
        </Card.Header>
        <Card.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Row>
            <Col className="text-start">
              <Card>
                <Card.Body>
                  <Form.Group controlId="tagline-text" className="mb-3">
                    <Form.Label>Your Tagline:</Form.Label>
                    <Form.Control type="text" value={newTagline} onChange={(e) => setNewTagline(e.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="bio-textarea">
                    <Form.Label>Your Bio:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={7}
                      style={{resize:"none"}}
                      value={newBio}
                      onChange={(e) => setNewBio(e.target.value)}
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Form.Group controlId="avatarFile" className="m-1">
                <Card>
                  <Card.Header>
                    <Form.Label>Change Avatar</Form.Label>
                  </Card.Header>
                  <Card.Img src={avatarUrl} alt="avatar-img"/>
                  <Card.Body>
                    <Form.Label className="text-muted">200px × 200px</Form.Label>
                    <Form.Control type="file" onChange={handleAvatarUpload}/>
                  </Card.Body>
                </Card>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="coverFile" className="m-1">
            <Card>
              <Card.Header>
                <Form.Label>Change Cover Image</Form.Label>
              </Card.Header>
              <Card.Img src={coverUrl} alt="cover-img"/>
              <Card.Body>
                <Form.Label className="text-muted">1920px × 360px</Form.Label>
                <Form.Control type="file" onChange={handleCoverUpload}/>
              </Card.Body>
            </Card>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">Update Profile</Button>
        </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default EditProfilePage;