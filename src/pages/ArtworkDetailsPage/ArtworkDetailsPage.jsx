import React from 'react'
import { Row, Col, Carousel, Card } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

const ArtworkDetailsPage = () => {
  const location = useLocation();
  const { artwork } = location.state;
  const { title, assets, description, category, medium } = artwork

  return (
    <Row>
      <Col>
        <Carousel
          controls={ assets.length < 2 ? false : true}
          fade
          variant="dark"
          indicators={false}
          style={{height: "60vh"}}
        >
          { assets.map((asset, i) => {
              return (
                <Carousel.Item key={title+i}>
                  <img
                    className="d-block m-auto"
                    src={asset}
                    alt={title+i}
                    style={{height: "inherit", }}
                />
                </Carousel.Item>
              )
            })}
        </Carousel>
      </Col>
      <Col>
        <Card>
            <Card.Body>
              <h3>{title}</h3>
              <p>{description}</p>
              <p>Category: {category}</p>
              <p>Medium: {medium}</p>
            </Card.Body>
          
        </Card>
      </Col>

    </Row>
  );
}

export default ArtworkDetailsPage;