import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Button, Card, Form } from 'react-bootstrap';
import userService from '../../services/user.service';

const CreateArtworkPage = () => {
  const { user } = useContext(AuthContext);
  const [userAlbums, setUserAlbums] = useState([]);
  const [mediumOptions, setMediumOptions] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [medium, setMedium] = useState("");
  const [album, setAlbum] = useState("")

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log({
        title, description, category, medium, album
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <Card className="w-75 m-auto mt-5">
      <Card.Header className="text-center">
        <h4>Create Artwork</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group controlId="title-text">
            <Form.Label>Artwork Title</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="category-select">
            <Form.Label>Category</Form.Label>
            <Form.Select value={category} onChange={(e) => handleCategory(e)}>
              <option>Choose Category...</option>
              <option value="physicalMedia">Physical Media</option>
              <option value="digitalMedia">Digital Media</option>
              <option value="photography">Photography</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="medium-select">
            <Form.Label>Medium</Form.Label>
            <Form.Select value={medium} onChange={(e) => setMedium(e.target.value)}>
              <option>Choose Medium...</option>
              { mediumOptions.map(option =>
                  <option key={option.value} value={option.value}>{option.text}</option>
              )}
            </Form.Select>
          </Form.Group>

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
            <Form.Control type="file" multiple />
          </Form.Group>

          <Form.Group controlId="album-select">
            <Form.Label>Album</Form.Label>
            <Form.Select value={album} onChange={(e) => setAlbum(e.target.value)}>
              <option>Choose Album...</option>
              { userAlbums.map(album =>
                  <option key={album._id} value={album._id}>{album.title}</option>
              )}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">Create Artwork</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateArtworkPage;