import React, { useEffect, useState } from 'react'
import { Row, Col, Carousel, Container } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import artworkService from '../../services/artwork.service';
import moment from "moment";

const ArtworkDetailsPage = () => {
  const { _id } = useParams();
  const [artData, setArtData] = useState({});

  useEffect(() => {
    const getArtData = async () => {
      try {
        const res = await artworkService.getOne(_id);
        setArtData(res.data);
        console.log(res.data)
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
    <Container fluid>
      <Row>
        <Col className="bg-black">
          <Carousel
            className="bg-black position-relative top-50 start-50 translate-middle"
            interval={null}
            slide={false}
            controls={ artData?.assets?.length < 2 ? false : true}
            indicators={false}
            style={{width: "75vw", height:"93vh"}}
          >
            { artData?.assets?.map((asset, i) => {
                return (
                  <Carousel.Item key={artData?.title+i}>
                    <img
                      className="d-block m-auto position-relative"
                      src={asset}
                      alt={artData?.title+i}
                      style={{height:"70vh", objectFit: "fill"}}
                  />
                  </Carousel.Item>
                )
              })}
          </Carousel>
        </Col>
        <Col className="bg-dark">
          <div className="bg-dark p-3 pt-5">
            <div className='d-flex align-items-center mb-5'>
              <img src={artData?.author?.avatar} alt="" style={{width:"75px", borderRadius:"50%"}}/>
              <h3 className='ms-3'>{artData?.author?.username}</h3>
            </div>
            <h3>{artData?.title}</h3>
            <em className='text-muted'>Posted on {moment(artData?.createdAt).format('MMM DD, YYYY')}</em>
            <p className='mt-5'>{artData?.description}</p>
          </div>
        </Col>
      </Row>
    </Container>
    }
    </>
  );
}

export default ArtworkDetailsPage;