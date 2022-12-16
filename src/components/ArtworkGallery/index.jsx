import React from 'react';
import { Image } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const ArtworkGallery = () => {
  const location = useLocation();
  const { gallery } = location.state;
  const {title, artworks} = gallery

  return (
    <div className="text-center">
      <h1>{title}</h1>
      <div className='d-flex justify-content-center'>
      {artworks?.map((artwork) =>
        <Link to={`/artworks/${artwork._id}`} key={artwork._id}>
          <Image
            thumbnail={true}
            src={artwork.assets[0]}
            style={{width:"200px", height:"200px", objectFit:"contain"}}
            className="m-4 shadow"
          />
        </Link>
      )}
      </div>
    </div>
  );
}

export default ArtworkGallery;