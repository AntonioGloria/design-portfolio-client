import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import AlbumCard from '../AlbumCard';
import CreateAlbumForm from '../AlbumGalleryComps/CreateAlbumForm';

const AlbumGallery = (props) => {
  const { user, albums, type } = props;
  const { isLoggedIn, user: loggedUser } = useContext(AuthContext);

  return (
    <>
      {isLoggedIn && user===loggedUser.username &&
        <CreateAlbumForm owner={loggedUser}/>
      }
      <div className='d-flex justify-content-center'>
        {albums?.map(album =>
          <AlbumCard
            album={album}
            path={`/${user}/${type}/${album._id}`}
            key={album._id}/>
        )}
      </div>
    </>
  );
}

export default AlbumGallery;