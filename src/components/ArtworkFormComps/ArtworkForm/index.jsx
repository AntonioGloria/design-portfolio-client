import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import artworkService from '../../../services/artwork.service';
import filesService from '../../../services/files.service';
import Loading from '../../Loading/Loading'
import InputTitle from '../InputTitle';
import InputImages from '../InputImages';
import InputDescription from '../InputDescription';
import InputCategory from '../InputCategory';
import InputMedium from '../InputMedium';
import InputAlbum from '../InputAlbum';

const ArtworkForm = (props) => {
  const { type, albumData, artData } = props;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false)
  const [mediumOptions, setMediumOptions] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [medium, setMedium] = useState("");
  const [selectedAlbums, setSelectedAlbums] = useState([]);
  const [userAlbums, setUserAlbums] = useState([]);
  const [assets, setAssets] = useState([]);
  const [deleteAssets, setDeleteAssets] = useState([]);

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
    if (albumData) {
      setUserAlbums(albumData);
    }

    if (artData) {
      setTitle(artData.title);
      setDescription(artData.description);
      setAssets(artData.assets);
      setCategory(artData.category)
      setMediumOptions(categoryMedia[artData.category])
      setMedium(artData.medium);
      setSelectedAlbums(artData.albums);
    }

    setLoading(false)
  }, [albumData, artData, categoryMedia])

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
          : await artworkService.editArtwork(artData._id, formData);

        if (deleteAssets.length > 0) {
          await filesService.deleteImageMulti(deleteAssets);
        }

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
            <Col xl={8}>
            <InputImages assets={assets} setAssets={setAssets} setDeleteAssets={setDeleteAssets} validated={validated}/>
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