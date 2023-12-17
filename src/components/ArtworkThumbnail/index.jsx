import { Image } from "react-bootstrap";

const ArtworkThumbnail = (props) => {
  const { imageSrc } = props;
  return (
    <Image
      thumbnail={true}
      src={imageSrc}
      style={{
        width:"200px",
        height:"200px",
        objectFit:"cover"
      }}
      className="m-4 shadow"
    />
  )
}

export default ArtworkThumbnail