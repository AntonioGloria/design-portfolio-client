import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const AlbumCard = (props) => {
  const { album, path } = props;
  const { title } = album;
  return (
    <Link
      to={path}
      state={{gallery: album}}
      className="text-decoration-none"
    >
      <Card className="m-4 shadow text-center" style={{width:"200px"}}>
        <Card.Img
          src="https://res.cloudinary.com/dwhznw5ny/image/upload/v1671209665/design-portfolio/ui-defaults/defaultAlbum_qgieye.png"
        />
        <Card.Footer>
          {title}
        </Card.Footer>
      </Card>
    </Link>
  )
}

export default AlbumCard