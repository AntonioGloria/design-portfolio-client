import AlbumCard from '../AlbumCard';

const FavoritesGallery = (props) => {
  const { user, albums } = props;

  return (
    <div className='d-flex justify-content-center'>
      {albums?.map(album =>
        <AlbumCard
          album={album}
          path={`/${user}/favorites/${album._id}`}
          key={album._id}/>
      )}
    </div>
  );
}

export default FavoritesGallery;