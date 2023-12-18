import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/auth.context';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import userService from '../../../services/user.service';
import artworkService from '../../../services/artwork.service';
import Loading from "../../Loading/Loading"
import InputTitle from '../InputTitle';
import InputImages from '../InputImages';
import InputDescription from '../InputDescription';
import InputCategory from '../InputCategory';
import InputMedium from '../InputMedium';
import InputAlbum from '../InputAlbum';

const ArtworkForm = (props) => {
  const { type, artworkId } = props;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true)
  const [userAlbums, setUserAlbums] = useState(null);
  const [mediumOptions, setMediumOptions] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [medium, setMedium] = useState("");
  const [selectedAlbums, setSelectedAlbums] = useState(null);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch and prefill artwork data if on Edit page
        if (type === "Edit") {
          const artworkRes = await artworkService.getOne(artworkId);

          setTitle(artworkRes.data.title);
          setDescription(artworkRes.data.description);
          setAssets(artworkRes.data.assets);
          setCategory(artworkRes.data.category);
          setMedium(artworkRes.data.medium); // still needs sorting out
        }

        const res = await userService.getUserAlbums(user.username);
        const [resUser] = res.data;
        const { ownAlbums } = resUser;

        setUserAlbums(ownAlbums);
        setSelectedAlbums([ownAlbums[0]._id]);

        setLoading(false)
      }
      catch (err) {
        console.log(err);
      }
    }
    getData();
  },[artworkId, type, user]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let response;

      const formData = {
        title,
        description,
        category,
        medium,
        albums: selectedAlbums,
        assets
      };

      if (type === "Create") {
        response = await artworkService.create(formData);
      }

      else {
        response = await artworkService.editArtwork(artworkId, formData);
      }

      navigate(`/artworks/${response.data._id}`);
    }

    catch (err) {
      console.log(err);
    }
  }

  if (loading) {
    return(<Loading/>)
  }

  return (
    <Card className="w-75 m-auto mt-5 shadow">
      <Card.Header className="text-center">
        <h4>{type} Artwork</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Row>
            <Col>
              <InputTitle title={title} setTitle={setTitle}/>
              <Row>
                <Col>
                  <InputCategory category={category} setCategory={setCategory} setMediumOptions={setMediumOptions}/>
                </Col>
                <Col>
                  <InputMedium medium={medium} setMedium={setMedium} mediumOptions={mediumOptions}/>
                </Col>
              </Row>
              <InputDescription description={description} setDescription={setDescription}/>
              <InputAlbum setSelectedAlbums={setSelectedAlbums} userAlbums={userAlbums}/>
            </Col>
            <Col>
            <InputImages assets={assets} setAssets={setAssets}/>
            </Col>
          </Row>
          <Form.Group className="text-center">
            <Button variant="primary" type="submit">{type} Artwork</Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ArtworkForm;