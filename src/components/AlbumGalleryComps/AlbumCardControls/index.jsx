import { Button, DropdownButton } from "react-bootstrap";

const AlbumCardControls = (props) => {
  const { album, setManageAlbum, setShowModal, setIsEditing } = props;

  const handleDelete = () => {
    setShowModal(true);
    setManageAlbum(album);
  }

  return (
    <DropdownButton
      className="position-absolute z-1"
      variant="secondary"
      menuVariant="dark"
      drop="bottom"
      title=<i className="fa-solid fa-gear"/>
    >
      <div className="d-flex justify-content-around p-1">
        <Button variant="warning" onClick={() => setIsEditing(prev =>! prev)}>
          <i className="fa-solid fa-pen-to-square"/>
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          <i className="fa-solid fa-trash-can"/>
        </Button>
      </div>
    </DropdownButton>
  )
}

export default AlbumCardControls;