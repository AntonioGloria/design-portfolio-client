import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Thumbnail from '../ArtworkThumbnail';
import EmptySection from "../EmptySection";

const ArtworkGallery = () => {
  const location = useLocation();
  const { gallery } = location.state;
  const {title, artworks} = gallery

  return (
    <div className="text-center">
      <h1>{title}</h1>
      <Container fluid style={{width: "95.2vw"}}>
        {artworks.length === 0 && <EmptySection item={"Artworks"}/>}
        <Row className="row-cols-auto g-3">
          {artworks.map(({assets, _id}) =>
            <Col key={_id}>
              <Link to={`/artworks/${_id}`}>
                <Thumbnail imageSrc={assets[0]}/>
              </Link>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default ArtworkGallery;