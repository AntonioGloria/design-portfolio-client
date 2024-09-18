import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/auth.context';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useParams, Link } from "react-router-dom";
import artworkService from '../../services/artwork.service';
import userService from '../../services/user.service';
import ArtworkDisplay from '../../components/ArtworkDetailsComps/ArtworkDisplay';
import ArtworkSidePanel from '../../components/ArtworkDetailsComps/ArtworkSidePanel';
import AddToFavorites from '../../components/ArtworkDetailsComps/AddToFavorites';
import DeleteModal from '../../components/DeleteModal';
import Loading from '../../components/Loading/Loading';

const ArtworkDetailsPage = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { _id } = useParams();
  const [artData, setArtData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userFavorites, setUserFavorites] = useState([]);
  const [userIsOwner, setUserIsOwner] = useState(false);

  const openModal = () => setShowModal(true);

  useEffect(() => {
    const getArtData = async () => {
      try {
        const resArtDetails = await artworkService.getOne(_id);

        if (isLoggedIn) {
          const { username } = user;
          const resIsOwner = await artworkService.verifyOwnership(_id);

          if (!resIsOwner.data) {
            const resUserFavs = await userService.getUserAlbums(username, "favorites");
            setUserFavorites(resUserFavs.data);
          }

          else {
            setUserIsOwner(resIsOwner.data);
          }
        }
        setArtData(resArtDetails.data);
        setIsLoading(false);
      }
      catch (err) {
        console.log(err);
      }
    }
    getArtData();
  }, [_id, isLoggedIn, user]);

  if (isLoading) {
    return <Loading/>
  }

  return (
    <Container fluid>
      <Row>
        <Col className="bg-black">
          <ArtworkDisplay artData={artData}/>
        </Col>
        <Col className="bg-dark">
          <ArtworkSidePanel artData={artData}/>
          {userIsOwner &&
          <>
            <hr/>
            <h5 className='text-center mb-3'>Manage Project</h5>
            <div className='d-flex justify-content-around'>
              <Link to={`/artworks/${_id}/edit`}>
                <Button variant='warning'>
                  <i className="fa-solid fa-pen-to-square"/>
                  &nbsp;Edit Project
                </Button>
              </Link>
              <Button variant='danger' onClick={openModal}>
                <i className="fa-solid fa-trash-can"/>
                &nbsp;Delete Project
              </Button>
            </div>
            <DeleteModal
              showModal={showModal}
              setShowModal={setShowModal}
              id={_id}
              type={"project"}
              data={artData}
            />
          </>
          }

          {isLoggedIn && !userIsOwner &&
            <AddToFavorites
              favAlbums={userFavorites}
              artData={artData}
              setArtData={setArtData}
              user={user}
            />
          }
        </Col>
      </Row>
    </Container>
  );
}

export default ArtworkDetailsPage;