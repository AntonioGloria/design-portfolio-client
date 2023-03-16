import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import albumService from "../../services/album.service";
import artworkService from "../../services/artwork.service";
import filesService from "../../services/files.service";

const DeleteModal = (props) => {
  const {showModal, setShowModal, type, data, albums, setAlbums } = props;
  const { _id, title } = data;
  const navigate = useNavigate();

  const handleDelete = async (type, id) => {
    try {
      if (type === "project") {
        const { username } = data.author;
        const { assets } = data;

        await filesService.deleteImageMulti(assets);
        await artworkService.deleteOne(id);

        navigate(`/${username}`);
      }

      else if (type === "album") {
        const deletedAlbum = await albumService.deleteAlbum(id);

        const newAlbums = albums.filter(album =>
          album._id !== deletedAlbum.data._id
        );

        setAlbums(newAlbums);
        setShowModal(false);
      }
    }

    catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      backdrop="static"
      keyboard={false}
      contentClassName="bg-body"
      centered
    >
      <Modal.Header closeButton closeVariant="white" className="border-bottom-0 bg-danger">
        <Modal.Title>
          <i className="fa-solid fa-triangle-exclamation"/>
          &nbsp;DELETE {`${type.toUpperCase()}`}&nbsp;
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the {type} {title}?
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
        <Button variant="danger" onClick={() => handleDelete(type, _id)}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal;