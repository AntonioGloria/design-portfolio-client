import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/auth.context';
import { Row, Col, Carousel, Container, Button, Modal } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import artworkService from '../../services/artwork.service';
import moment from "moment";

const ArtworkDetailsPage = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { _id } = useParams();
  const [artData, setArtData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const showDelete = () => setShowModal(true);
  const closeDelete = () => setShowModal(false);

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
      <>
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

              {isLoggedIn && artData?.author?.username===user.username &&
                <>
                  <hr/>
                  <h5 className='text-center mb-3'>Manage Project</h5>
                  <div className='d-flex justify-content-around'>
                    <Button variant='warning'>
                      <i className="fa-solid fa-pen-to-square"/>
                      &nbsp;Edit Project
                    </Button>
                    <Button variant='danger' onClick={showDelete}>
                      <i className="fa-solid fa-trash-can"/>
                      &nbsp;Delete Project
                    </Button>
                  </div>
                </>
              }
            </div>
          </Col>
        </Row>
      </Container>
      <Modal
        show={showModal}
        onHide={closeDelete}
        backdrop='static'
        keyboard={false}
        contentClassName='bg-body'
        centered
      >
        <Modal.Header closeButton closeVariant='white' className='border-bottom-0 bg-danger'>
          <Modal.Title>
            <i className="fa-solid fa-triangle-exclamation"/>
            &nbsp;DELETE PROJECT&nbsp;
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this project?
        </Modal.Body>
        <Modal.Footer className='border-top-0'>
          <Button variant='danger' onClick={showDelete}>Delete</Button>
          <Button variant='secondary' onClick={closeDelete}>Cancel</Button>
        </Modal.Footer>
      </Modal>
      </>
    }
    </>
  );
}

export default ArtworkDetailsPage;