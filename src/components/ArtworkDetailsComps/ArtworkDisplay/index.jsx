import "./style.css";
import { Carousel } from "react-bootstrap";

const ArtworkDisplay = (props) => {
  const { artData } = props;
  const { title, assets } = artData;

  return (
    <Carousel
      interval={null}
      slide={false}
      controls={assets.length < 2 ? false : true}
      indicators={false}
      style={{width: "75vw", height:"93vh"}}
    >
      {assets.map((asset, i) => {
        return (
          <Carousel.Item key={title+i}>
            <img
              className="d-block position-absolute top-50 start-50 translate-middle"
              src={asset}
              alt={title+i}
              style={{height:"75vh", objectFit: "fill"}}
            />
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default ArtworkDisplay;