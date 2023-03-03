import { Carousel } from "react-bootstrap";

const ArtworkDisplay = (props) => {
  const { artData } = props;
  const { title, assets } = artData;

  return (
    <Carousel
      className="position-relative top-50 start-50 translate-middle"
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
              className="d-block m-auto position-relative"
              src={asset}
              alt={title+i}
              style={{height:"70vh", objectFit: "fill"}}
            />
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default ArtworkDisplay;