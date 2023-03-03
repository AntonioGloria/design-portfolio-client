import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/auth.context';
import { Row, Col, Container, Button, Modal } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import artworkService from '../../services/artwork.service';
import ArtworkDisplay from '../../components/ArtworkDetailsComps/ArtworkDisplay';
import ArtworkSidePanel from '../../components/ArtworkDetailsComps/ArtworkSidePanel';

const ArtworkDetailsPage = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { _id } = useParams();
  const [artData, setArtData] = useState(null);
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
      <Container fluid>
        <Row>
          <Col className="bg-black">
            <ArtworkDisplay artData={artData}/>
          </Col>
          <Col className="bg-dark">
            <ArtworkSidePanel artData={artData}/>
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
                <Modal
                  show={showModal}
                  onHide={closeDelete}
                  backdrop='static'
                  keyboard={false}
                  contentClassName='bg-body'
                  centered
                >
                  <Modal.Header
                    closeButton
                    closeVariant='white'
                    className='border-bottom-0 bg-danger'
                  >
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
          </Col>
        </Row>
      </Container>
    }
    </>
  );
}

export default ArtworkDetailsPage;