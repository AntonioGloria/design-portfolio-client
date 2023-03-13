import { useState, useEffect, useContext } from 'react';
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

          <div className='d-flex justify-content-center flex-wrap'>
            {albums.map(album =>
              <AlbumCard
                key={album._id}
                album={album}
                path={`/${user}/${type}/${album._id}`}
              />
            )}
          </div>
        </>}
    </>
  );
}

export default AlbumGallery;