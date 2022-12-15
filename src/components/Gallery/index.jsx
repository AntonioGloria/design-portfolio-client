import React from 'react'
import { Card, } from "react-bootstrap"
import { Link } from "react-router-dom"

const Gallery = (props) => {
  const { user, items } = props;
  return (
    <div className='d-flex justify-content-center'>
      {items?.map(item =>
        <Link
          key={item._id}
          to={`/${user}/albums/${item._id}`}
        >
        <Card className="m-4 shadow text-center">
          <Card.Img
            src="https://res.cloudinary.com/dwhznw5ny/image/upload/v1671064095/design-portfolio/ui-defaults/defaultAlbum_zgve7a.png"
            style={{width:"200px"}}
          />
          <Card.Footer>
            {item.title}
          </Card.Footer>
        </Card>
        </Link>
        )}
    </div>
  );
}

export default Gallery;