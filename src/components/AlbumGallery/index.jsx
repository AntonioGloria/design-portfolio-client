import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../context/auth.context';
import AlbumCard from '../AlbumCard';
import CreateAlbumForm from '../AlbumGalleryComps/CreateAlbumForm';

const AlbumGallery = (props) => {
  const { user, type } = props;
  const { isLoggedIn, user: loggedUser } = useContext(AuthContext);
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    setAlbums(props.albums);
  }, [props]);

  return (
    <>
      {albums &&
        <>{isLoggedIn && user===loggedUser.username &&
            <CreateAlbumForm
              owner={loggedUser}
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
                  />
                </Col>
              )}
            </Row>
          </Container>
        </>}
    </>
  );
}

export default AlbumGallery;