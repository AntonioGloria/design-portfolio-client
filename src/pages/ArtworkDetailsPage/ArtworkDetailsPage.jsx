import React, { useEffect, useState } from 'react'
import { Row, Col, Carousel, Container } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import artworkService from '../../services/artwork.service';

const ArtworkDetailsPage = () => {
  const { _id } = useParams();
  const [artData, setArtData] = useState({});

  useEffect(() => {
    const getArtData = async () => {
      try {
        const res = await artworkService.getOne(_id);
        setArtData(res.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    getArtData();
  }, [_id]);


  return (
    <>
    {!artData && <p>NOTHING HERE</p>}
    {artData &&
    <Container fluid style={{height: "93.2vh", overflow: "hidden"}}>
      <Row className='h-100'>
        <Col className="d-flex bg-black align-items-center justify-content-center">
          <Container>
            <Carousel
              slide={false}
              controls={ artData?.assets?.length < 2 ? false : true}
              indicators={false}
            >
              { artData?.assets?.map((asset, i) => {
                  return (
                    <Carousel.Item key={artData?.title+i}>
                      <img
                        className="d-block m-auto"
                        src={asset}
                        alt={artData?.title+i}
                    />
                    </Carousel.Item>
                  )
                })}
            </Carousel>
          </Container>
        </Col>
        <Col>
          <div className="bg-dark p-5 m-0">
            <h3>{artData?.title}</h3>
            <p>{artData?.description}</p>
            <p>Category: {artData?.category}</p>
            <p>Medium: {artData?.medium}</p>
          </div>
        </Col>
      </Row>
    </Container>
    }
    </>
  );
}

export default ArtworkDetailsPage;