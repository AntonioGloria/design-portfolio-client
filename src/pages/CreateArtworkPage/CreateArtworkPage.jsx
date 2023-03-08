import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { Button, Card, Form, Row, Col, ProgressBar } from 'react-bootstrap';
import userService from '../../services/user.service';
import filesService from '../../services/files.service';
import artworkService from '../../services/artwork.service';

const CreateArtworkPage = () => {
  const navigate = useNavigate();

  const [progressBar, setProgressBar] = useState(0);
  const [uploadStart, setUploadStart] = useState(false);

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
      setUploadStart(true);

      for (const file of fileList) {
        uploadData.append("imageUrl", file);
      };

      const res = await filesService.uploadImageMulti(uploadData,
        {
          onUploadProgress: e => {
            setProgressBar(Math.round(e.loaded/e.total*100, 0));
          }
        }
      );
      setAssets(res.data.fileUrls);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newArtwork = await artworkService.create({
        title,
        author: user._id,
        description,
        category,
        medium,
        albums,
        assets
      });
      navigate(`/artworks/${newArtwork.data._id}`);
    }

    catch (err) {
      console.log(err);
    }
  }

  return (
    <Card className="w-75 m-auto mt-5 shadow">
      <Card.Header className="text-center">
        <h4>New Artwork</h4>
      </Card.Header>

      <Card.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Row>
            <Col>
              <Card className="m-3">
                <Form.Group controlId="title-text">
                  <Card.Header>
                    <Form.Label>Artwork Title</Form.Label>
                  </Card.Header>
                  <Card.Body>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                  </Card.Body>
                </Form.Group>
              </Card>

              <Card className="m-3">
                <Form.Group controlId="assets-file">
                  <Card.Header>
                    <Form.Label>{"Upload Artwork Image(s)"}</Form.Label>
                  </Card.Header>
                  <Card.Body>
                    <Form.Control type="file" multiple onChange={handleAssetUploads}/>
                    { uploadStart &&
                      <div className="mt-3">
                        <p className="mb-1 text-center">
                          {progressBar < 100
                            ? "Upload in progress..."
                            : "Upload Completed!"}
                        </p>
                        <ProgressBar
                          now={progressBar}
                          label={`${progressBar}%`}
                          style={{
                            height: "2em",
                            fontWeight: "bold",
                            textShadow: "0 0 3px black",
                          }}
                        />
                      </div>
                    }
                  </Card.Body>
                </Form.Group>
              </Card>

              <Card className="m-3">
                <Form.Group controlId="description-textarea">
                  <Card.Header>
                    <Form.Label>Artwork Description</Form.Label>
                  </Card.Header>
                  <Card.Body>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      style={{resize:"none"}}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Card.Body>
                </Form.Group>
              </Card>
            </Col>

            <Col>
              <Card className="m-3">
                <Form.Group controlId="category-select">
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
                </Form.Group>
              </Card>

              <Card className="m-3">
                <Form.Group controlId="medium-select">
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
                </Form.Group>
              </Card>

            <Card className="m-3">
              <Form.Group controlId="album-select">
                <Card.Header>
                  <Form.Label>Album</Form.Label>
                </Card.Header>
                <Card.Body>
                  <Form.Select multiple={true} onChange={(e) => handleSelectAlbums(e)}>
                    { userAlbums.map(album =>
                        <option key={album._id} value={album._id}>{album.title}</option>
                    )}
                  </Form.Select>
                </Card.Body>
              </Form.Group>
            </Card>

            </Col>
          </Row>
          <Form.Group className="text-center">
            <Button variant="primary" type="submit">Create Artwork</Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateArtworkPage;