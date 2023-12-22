import { useState, useEffect, useContext, useMemo } from 'react';
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

  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false)

  const { user } = useContext(AuthContext);
  const [userAlbums, setUserAlbums] = useState(null);
  const [mediumOptions, setMediumOptions] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [medium, setMedium] = useState("");
  const [selectedAlbums, setSelectedAlbums] = useState(null);
  const [assets, setAssets] = useState([]);

  const categoryMedia = useMemo(() => {
    return {
      physicalMedia: [
        { value: "physDrawing", text : "Drawing" },
        { value: "physPainting", text: "Painting" },
        { value: "physSculpture", text: "Sculpture" }
      ],

      digitalMedia: [
        { value: "digiDrawing", text: "Digital Drawing" },
        { value: "digiPainting", text: "Digital Painting" },
        { value: "digi3DArt", text: "3D Art" }
      ],

      photography: [
        { value: "photoPortrait", text: "Portrait" },
        { value: "photoNature", text: "Nature" },
        { value: "photoMacro", text: "Macro" }
      ],
      "" : []
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch and prefill artwork data if on Edit page
        if (type === "Edit") {
          const { data } = await artworkService.getOne(artworkId);

          setTitle(data.title);
          setDescription(data.description);
          setAssets(data.assets);
          setCategory(data.category)
          setMediumOptions(categoryMedia[data.category])
          setMedium(data.medium);
          setSelectedAlbums(data.albums);
        }

        const res = await userService.getUserAlbums(user.username);
        const [resUser] = res.data;
        const { ownAlbums } = resUser;

        setUserAlbums(ownAlbums);
        setLoading(false)
      }
      catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [artworkId, type, user, categoryMedia]);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    setValidated(true);

    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    else {
      const formData = {
        title,
        description,
        category,
        medium,
        albums: selectedAlbums,
        assets
      };

      try {
        const response = type === "Create"
          ? await artworkService.create(formData)
          : await artworkService.editArtwork(artworkId, formData);

        navigate(`/artworks/${response.data._id}`);
      }

      catch (error) {
        console.log(error)
      }
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
        <Form noValidate validated={validated} onSubmit={handleSubmit} encType="multipart/form-data">
          <Row>
            <Col>
              <InputTitle title={title} setTitle={setTitle}/>
              <Row>
                <Col>
                  <InputCategory vars={{category, categoryMedia}} funcs={{setCategory, setMediumOptions}}/>
                </Col>
                <Col>
                  <InputMedium medium={medium} setMedium={setMedium} mediumOptions={mediumOptions}/>
                </Col>
              </Row>
              <InputDescription description={description} setDescription={setDescription}/>
              <InputAlbum vars={{selectedAlbums, userAlbums}} funcs={{setSelectedAlbums}}/>
            </Col>
            <Col>
            <InputImages assets={assets} setAssets={setAssets} validated={validated}/>
            </Col>
          </Row>
          <Row>
            <Col className='text-center'>
              <Button variant="primary" type="submit">{type} Artwork</Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ArtworkForm;