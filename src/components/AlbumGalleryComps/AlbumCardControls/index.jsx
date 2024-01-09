import { useState } from "react";
import { Button, DropdownButton, Form, InputGroup } from "react-bootstrap";
import albumService from "../../../services/album.service";

const AlbumCardControls = (props) => {
  const { album, setManageAlbum, setShowModal } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(album.title)

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await albumService.renameOne(album._id, {title: newTitle});
      setIsEditing(false);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleDelete = () => {
    setShowModal(true);
    setManageAlbum(album);
  }

  return (
      <DropdownButton
        className="position-absolute"
        variant="secondary"
        menuVariant="dark"
        drop="bottom"
        title=<i className="fa-solid fa-gear"/>
      >
        <div className="d-flex justify-content-around p-1">
          <Button variant="warning" onClick={() => setIsEditing(prev=>!prev)}>
            <i className="fa-solid fa-pen-to-square"/>
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            <i className="fa-solid fa-trash-can"/>
          </Button>
        </div>
        { isEditing &&
          <Form className="position-relative">
            <InputGroup>
              <Form.Control value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
              <Button id="album-title" onClick={handleEdit}>Accept</Button>
            </InputGroup>
          </Form>
        }
      </DropdownButton>
  )
}

export default AlbumCardControls;