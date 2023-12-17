import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import userService from '../../services/user.service';
import artworkService from '../../services/artwork.service';
import InputTitle from '../../components/ArtworkFormComps/InputTitle';
import InputImages from '../../components/ArtworkFormComps/InputImages';
import InputDescription from '../../components/ArtworkFormComps/InputDescription';
import InputCategory from '../../components/ArtworkFormComps/InputCategory';
import InputMedium from '../../components/ArtworkFormComps/InputMedium';
import InputAlbum from '../../components/ArtworkFormComps/InputAlbum';

const CreateArtworkPage = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [userAlbums, setUserAlbums] = useState(null);
  const [mediumOptions, setMediumOptions] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [medium, setMedium] = useState("");
  const [selectedAlbums, setSelectedAlbums] = useState(null);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const res = await userService.getUserAlbums(user.username);
        const [resUser] = res.data;
        const { ownAlbums } = resUser;
        setUserAlbums(ownAlbums);
        setSelectedAlbums([ownAlbums[0]._id]);
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
      const newArtwork = await artworkService.create({
        title,
        creator: user._id,
        description,
        category,
        medium,
        albums: selectedAlbums,
        assets
      });
      navigate(`/artworks/${newArtwork.data._id}`);
    }

    catch (err) {
      console.log(err);
    }
  }

  return (
    <> {userAlbums &&
    <Card className="w-75 m-auto mt-5 shadow">
      <Card.Header className="text-center">
        <h4>New Artwork</h4>
      </Card.Header>

      <Card.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Row>
            <Col>
              <InputTitle title={title} setTitle={setTitle}/>
              <InputImages assets={assets} setAssets={setAssets}/>
              <InputDescription description={description} setDescription={setDescription}/>
            </Col>
            <Col>
              <InputCategory category={category} setCategory={setCategory} setMediumOptions={setMediumOptions}/>
              <InputMedium medium={medium} setMedium={setMedium} mediumOptions={mediumOptions}/>
              <InputAlbum setSelectedAlbums={setSelectedAlbums} userAlbums={userAlbums}/>
            </Col>
          </Row>
          <Form.Group className="text-center">
            <Button variant="primary" type="submit">Create Artwork</Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
    } </>
  );
}

export default CreateArtworkPage;