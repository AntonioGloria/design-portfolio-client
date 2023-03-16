import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import AlbumCardControls from "../AlbumCardControls";

const AlbumCard = (props) => {
  const { album, path } = props;
  const { _id, title } = album;

  return (
    <Card className="shadow text-center" style={{width:"200px"}}>
      {album.title!=="All" && album.title!=="Favorites" &&
        <AlbumCardControls id={_id}/>
      }
      <Link
        to={path}
        state={{gallery: album}}
        className="text-decoration-none"
      >
        <Card.Img
          src="https://res.cloudinary.com/dwhznw5ny/image/upload/v1671209665/design-portfolio/ui-defaults/defaultAlbum_qgieye.png"
        />
        <Card.Footer>
          {title}
        </Card.Footer>
      </Link>
    </Card>
  )
}

export default AlbumCard;