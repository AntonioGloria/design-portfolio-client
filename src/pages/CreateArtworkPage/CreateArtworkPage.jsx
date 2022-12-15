import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import userService from '../../services/user.service';
import { useNavigate } from 'react-router-dom';

const CreateArtworkPage = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [userAlbums, setUserAlbums] = useState([]);
  const [mediumOptions, setMediumOptions] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [medium, setMedium] = useState("");
  const [albums, setAlbums] = useState([]);
  const [assets, setAssets] = useState([]);

  const physOptions = [
    {value: "physDrawing", text : "Drawing"},
    {value: "physPainting", text: "Painting"},
    {value:"physSculpture", text: "Sculpture"}
  ];

  const digiOptions = [
    {value: "digiDrawing", text: "Digital Drawing"},
    {value: "digiPainting", text: "Digital Painting"},
    {value: "digi3DArt", text: "3D Art"}
  ];

  const photoOptions = [
    {value: "photoPortrait", text: "Portrait"},
    {value: "photoNature", text: "Nature"},
    {value: "photoMacro", text: "Macro"}
  ];

  const handleCategory = (e) => {
    let choice = e.target.value;
    setCategory(choice);

    if (choice === "physicalMedia") {
      setMediumOptions(physOptions);
    }

    if (choice === "digitalMedia") {
      setMediumOptions(digiOptions);
    }

    if (choice === "photography") {
      setMediumOptions(photoOptions);
    }
  }

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const res = await userService.getUserAlbums(user.username);
        const [resUser] = res.data;
        const { ownAlbums } = resUser;
        setUserAlbums(ownAlbums);
      }
      catch (err) {
        console.log(err);
      }
    }
    getAlbums();
  },[user]);

  const handleSelectAlbums = (e) => {
    const allOptions = [...e.target.children];

    const selected = allOptions.filter(option => {
      return option.selected;
    });

    const selectedValues = selected.map(selected => {
      return selected.value;
    });

    setAlbums(selectedValues);
  }

  const handleAssetUploads = async (e) => {
    try {
      const uploadData = new FormData();
      const fileList = e.target.files;

      for (const file of fileList) {
        uploadData.append("imageUrl", file);
      };

      const res = await userService.uploadImageMulti(uploadData);
      setAssets(res.data.fileUrls);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newArtwork = await userService.createArtwork(user.username, {
        title,
        author: user._id,
        description,
        category,
        medium,
        albums,
        assets
      });
      navigate(`/artworks/${newArtwork._id}`, newArtwork);

    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <Card className="w-75 m-auto mt-5 shadow">
      <Card.Header className="text-center">
        <h4>Create Artwork</h4>
      </Card.Header>

      <Card.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Row>
          <Col>
          <Form.Group controlId="title-text">
            <Card>
              <Card.Header>
                <Form.Label>Artwork Title</Form.Label>
              </Card.Header>
              <Card.Body>
                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
              </Card.Body>
            </Card>
          </Form.Group>

          <Form.Group controlId="category-select">
            <Card>
              <Card.Header>
                <Form.Label>Category</Form.Label>
              </Card.Header>
              <Card.Body>
                <Form.Select value={category} onChange={(e) => handleCategory(e)}>
                  <option>Choose Category...</option>
                  <option value="physicalMedia">Physical Media</option>
                  <option value="digitalMedia">Digital Media</option>
                  <option value="photography">Photography</option>
                </Form.Select>
              </Card.Body>
            </Card>
          </Form.Group>

          <Form.Group controlId="medium-select">
            <Card>
              <Card.Header>
                <Form.Label>Medium</Form.Label>
              </Card.Header>
              <Card.Body>
                <Form.Select value={medium} onChange={(e) => setMedium(e.target.value)}>
                  <option>Choose Medium...</option>
                  { mediumOptions.map(option =>
                      <option key={option.value} value={option.value}>{option.text}</option>
                  )}
                </Form.Select>
              </Card.Body>
            </Card>
          </Form.Group>
          </Col>

          <Col>
          <Form.Group controlId="description-textarea">
            <Form.Label>Artwork Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              style={{resize:"none"}}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="assets-file">
            <Form.Label>{"Upload Artwork Image(s)"}</Form.Label>
            <Form.Control type="file" multiple onChange={handleAssetUploads}/>
          </Form.Group>

          <Form.Group controlId="album-select">
            <Form.Label>Album</Form.Label>
            <Form.Select multiple={true} onChange={(e) => handleSelectAlbums(e)}>
              { userAlbums.map(album =>
                  <option key={album._id} value={album._id}>{album.title}</option>
              )}
            </Form.Select>
          </Form.Group>
          </Col>
          </Row>
          <Button variant="primary" type="submit">Create Artwork</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateArtworkPage;