import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ArtworkThumbnail = (props) => {
  const { imageSrc, id } = props;
  return (
    <Link to={`/artworks/${id}`}>
      <Image
        thumbnail={true}
        src={imageSrc}
        style={{width:"200px", height:"200px", objectFit:"contain"}}
        className="m-4 shadow"
      />
    </Link>
  )
}

export default ArtworkThumbnail