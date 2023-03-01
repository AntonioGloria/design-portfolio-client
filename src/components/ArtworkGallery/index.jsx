import { useLocation } from "react-router-dom";
import Thumbnail from '../ArtworkThumbnail';

const ArtworkGallery = () => {
  const location = useLocation();
  const { gallery } = location.state;
  const {title, artworks} = gallery

  return (
    <div className="text-center">
      <h1>{title}</h1>
      <div className='d-flex justify-content-center'>
      {artworks?.map(({assets, _id}) =>
        <Thumbnail imageSrc={assets[0]} id={_id} key={_id}/>
      )}
      </div>
    </div>
  );
}

export default ArtworkGallery;