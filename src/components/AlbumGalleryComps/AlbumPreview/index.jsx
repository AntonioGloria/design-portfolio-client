import { Card, Container, Row, Col, Ratio } from "react-bootstrap";
import makeThumbnail from "../../../makeThumbnail";

const AlbumPreview = (props) => {
  const { album, thumbnail } = props;
  const { artworks } = album;

  const imgSrcs = artworks.slice(0, 4).map(artwork => makeThumbnail(artwork.assets[0]));

  if (imgSrcs.length === 0 || imgSrcs.length === 3) {
    imgSrcs.push(thumbnail);
  }

  return (
    <Container>
      <Row className={imgSrcs.length > 1 ? "row-cols-2" : "row-cols-1"}>
        {imgSrcs.map(img => {
          return (
            <Col key={img} className="m-0 p-0">
              <Ratio aspectRatio={imgSrcs.length === 2 ? 200 : "1x1"}>
                <Card.Img className="object-fit-cover" src={img}/>
              </Ratio>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default AlbumPreview