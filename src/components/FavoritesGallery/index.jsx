import React from 'react';
import { Card, } from "react-bootstrap";
import { Link } from "react-router-dom";

const FavoritesGallery = (props) => {
  const { user, albums } = props;

  return (
    <div className='d-flex justify-content-center'>
      {albums?.map(album =>
        <Link
          key={album._id}
          to={`/${user}/favorites/${album._id}`}
          state={{gallery: album}}
        >
        <Card className="m-4 shadow text-center" style={{width:"200px"}}>
          <Card.Img
            src="https://res.cloudinary.com/dwhznw5ny/image/upload/v1671209665/design-portfolio/ui-defaults/defaultAlbum_qgieye.png"
          />
          <Card.Footer>
            {album.title}
          </Card.Footer>
        </Card>
        </Link>
        )}
    </div>
  );
}

export default FavoritesGallery;