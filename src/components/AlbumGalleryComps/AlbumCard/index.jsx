import { useState } from "react";
import { Link } from "react-router-dom";
import albumService from "../../../services/album.service";
import { Card, Button, Form, InputGroup } from "react-bootstrap";
import AlbumCardControls from "../AlbumCardControls";
import AlbumPreview from "../AlbumPreview";

const AlbumCard = (props) => {
  const { album, path, userIsOwner, setManageAlbum, setShowModal } = props;
  const { title, thumbnail } = album;
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [newTitle, setNewTitle] = useState(title);

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await albumService.renameOne(album._id, { title: newTitle });
      setCurrentTitle(newTitle);
      setIsEditing(false);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <Card className="shadow text-center" style={{width:"11vw"}}>
      {album.title!=="All" && album.title!=="Favorites" && userIsOwner &&
        <AlbumCardControls
          album={album}
          setManageAlbum={setManageAlbum}
          setShowModal={setShowModal}
          setIsEditing={setIsEditing}
          setCurrentTitle={setCurrentTitle}
        />
      }
      <Link
        to={path}
        state={{gallery: album}}
        className="text-decoration-none"
      >
      <AlbumPreview album={album} thumbnail={thumbnail}/>
      </Link>
      {isEditing ?
        <Form className="position-relative">
          <InputGroup>
            <Form.Control value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
            <Button id="album-title" onClick={handleEdit}><i className="fa-solid fa-check"></i></Button>
          </InputGroup>
        </Form>
        :
        <Card.Footer className="user-select-none">
          {currentTitle}
        </Card.Footer>
      }
    </Card>
  )
}

export default AlbumCard;