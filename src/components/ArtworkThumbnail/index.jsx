import { Image, Ratio } from "react-bootstrap";

const ArtworkThumbnail = (props) => {
  const { imageSrc } = props;
  return (
    <Ratio aspectRatio="1x1" style={{width:"11vw"}}>
      <Image className="shadow object-fit-cover" thumbnail={true} src={imageSrc}/>
    </Ratio>
  )
}

export default ArtworkThumbnail