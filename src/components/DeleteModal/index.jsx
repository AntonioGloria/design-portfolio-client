import { Button, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import artworkService from "../../services/artwork.service";

const DeleteModal = (props) => {
  const {showModal, setShowModal, type, data } = props;
  const { _id, title } = data;
  const navigate = useNavigate();

  const closeModal = () => setShowModal(false);

  const handleDelete = async (type, id) => {
    try {
      if (type==='project') {
        const { username } = data.author;
        await artworkService.deleteOne(id);
        navigate(`/${username}`);
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      backdrop='static'
      keyboard={false}
      contentClassName='bg-body'
      centered
    >
      <Modal.Header closeButton closeVariant='white' className='border-bottom-0 bg-danger'>
        <Modal.Title>
          <i className="fa-solid fa-triangle-exclamation"/>
          &nbsp;DELETE {`${type.toUpperCase()}`}&nbsp;
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the {type} {title}?
      </Modal.Body>
      <Modal.Footer className='border-top-0'>
        <Button variant='danger' onClick={() => handleDelete(type, _id)}>Delete</Button>
        <Button variant='secondary' onClick={closeModal}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal;