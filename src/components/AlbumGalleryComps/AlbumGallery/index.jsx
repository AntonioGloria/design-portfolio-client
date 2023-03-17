import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../../context/auth.context';
import AlbumCard from '../AlbumCard';
import AlbumCardControls from "../AlbumCardControls";
import CreateAlbumForm from '../CreateAlbumForm';
import DeleteModal from "../../DeleteModal";

const AlbumGallery = (props) => {
  const { user, type } = props;
  const { isLoggedIn, user: loggedUser } = useContext(AuthContext);
  const [albums, setAlbums] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [manageAlbum, setManageAlbum] = useState(null);

  useEffect(() => {
    setAlbums(props.albums);
  }, [props]);

  return (
    <>
      {albums &&
        <>{isLoggedIn && user===loggedUser.username &&
            <CreateAlbumForm
              creator={loggedUser}
              albums={albums}
              setAlbums={setAlbums}
              type={type}
            />
          }

          <Container className="mt-4" fluid="lg">
            <Row className="gy-4">
              {albums.map(album =>
                <Col key={album._id} className="gx-1">
                  <AlbumCard
                    album={album}
                    path={`/${user}/${type}/${album._id}`}
                  >
                    {isLoggedIn && user===loggedUser.username &&
                      <AlbumCardControls
                        album={album}
                        setManageAlbum={setManageAlbum}
                        setShowModal={setShowModal}
                      />
                    }
                  </AlbumCard>
                </Col>
              )}
            </Row>
          </Container>
          {manageAlbum &&
            <DeleteModal
              showModal={showModal}
              setShowModal={setShowModal}
              type={"album"}
              data={manageAlbum}
              albums={albums}
              setAlbums={setAlbums}
            />
          }
        </>}
    </>
  );
}

export default AlbumGallery;