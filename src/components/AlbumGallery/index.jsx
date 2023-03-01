import AlbumCard from '../AlbumCard';

const AlbumGallery = (props) => {
  const { user, albums, type } = props;

  return (
    <div className='d-flex justify-content-center'>
      {albums?.map(album =>
        <AlbumCard
          album={album}
          path={`/${user}/${type}/${album._id}`}
          key={album._id}/>
      )}
    </div>
  );
}

export default AlbumGallery;