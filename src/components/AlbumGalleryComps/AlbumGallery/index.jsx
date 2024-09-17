import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../../context/auth.context';
import AlbumCard from '../AlbumCard';
import CreateAlbumForm from '../CreateAlbumForm';
import DeleteModal from "../../DeleteModal";
import userService from '../../../services/user.service';

const AlbumGallery = (props) => {
  const { user, albumType } = props;
  const { isLoggedIn, user: loggedUser } = useContext(AuthContext);
  const [albums, setAlbums] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [manageAlbum, setManageAlbum] = useState(null);

  useEffect(() => {
    const getAlbumData = async () => {
      try {
        let resAllPieces;

        if (albumType === "albums") {
          resAllPieces = await userService.getUserArtworks(user);
        }

        else if (albumType === "favorites") {
          resAllPieces = await userService.getUserFavorites(user);
        }

        const allPieces = {
          _id: "all",
          title: "All",
          artworks: resAllPieces.data,
          thumbnail: "https://res.cloudinary.com/dwhznw5ny/image/upload/v1702842616/design-portfolio/ui-defaults/defaultAlbum_zxv3sr.png"
        }

        const resAlbums = await userService.getUserAlbums(user, albumType);

        setAlbums([allPieces, ...resAlbums.data]);
      }
      catch (err) {
        console.log(err);
      }
    }
    getAlbumData();
  }, [user, albumType]);

  return (
    <>
    {isLoggedIn && user===loggedUser.username &&
      <CreateAlbumForm
        albums={albums}
        setAlbums={setAlbums}
        albumType={albumType}
      />
    }

    <Container className="mt-4">
      <Row className="gy-4">
        {albums.map(album =>
          <Col key={album._id} className="gx-1">
            <AlbumCard
              album={album}
              path={`/${user}/${albumType}/${album._id}`}
              setManageAlbum={setManageAlbum}
              setShowModal={setShowModal}
              userIsOwner={isLoggedIn && user===loggedUser.username}
            />
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
    </>
  );
}

export default AlbumGallery;