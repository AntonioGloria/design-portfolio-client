import React from 'react'
import { Row, Col, Carousel, Container } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

const ArtworkDetailsPage = () => {
  const location = useLocation();
  const { artwork } = location.state;
  const { title, assets, description, category, medium } = artwork

  return (
    <Container fluid style={{height: "93.2vh", overflow: "hidden"}}>
      <Row className='h-100'>
        <Col className="d-flex bg-black align-items-center justify-content-center">
          <Container>
            <Carousel
              slide={false}
              controls={ assets.length < 2 ? false : true}
              indicators={false}
            >
              { assets.map((asset, i) => {
                  return (
                    <Carousel.Item key={title+i}>
                      <img
                        className="d-block m-auto"
                        src={asset}
                        alt={title+i}
                    />
                    </Carousel.Item>
                  )
                })}
            </Carousel>
          </Container>
        </Col>
        <Col>
          <div className="bg-dark p-5 m-0">
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Category: {category}</p>
            <p>Medium: {medium}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ArtworkDetailsPage;