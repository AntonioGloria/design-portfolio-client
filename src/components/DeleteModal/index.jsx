import { Button, Modal } from "react-bootstrap";

const DeleteModal = (props) => {
  const {showModal, setShowModal, type, id, title } = props;

  const closeModal = () => setShowModal(false);

  const handleDelete = (type, id) => {
    console.log(`Deleting ${type} ${id}`);
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
        <Button variant='danger' onClick={() => handleDelete(type, id)}>Delete</Button>
        <Button variant='secondary' onClick={closeModal}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal;