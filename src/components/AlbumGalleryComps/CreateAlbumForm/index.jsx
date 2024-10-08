import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import albumService from "../../../services/album.service";

const CreateAlbumForm = (props) => {
  const { albums, setAlbums, albumType } = props;
  const [title, setTitle] = useState("");

  const typeTxt = albumType[0].toUpperCase() + albumType.slice(1, -1);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const newAlbum = await albumService.create({
        title,
        albumType
      });

      setAlbums([...albums, newAlbum.data]);
      setTitle("");
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <Form className="w-25 m-auto" onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder={`New ${typeTxt} Title`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          type="submit"
          disabled={title.length === 0}
          variant={title.length === 0 ? "secondary" : "primary"}
        >
          <i className="fa-solid fa-folder-plus"/>
          &nbsp;&nbsp;Create Album
        </Button>
      </InputGroup>
    </Form>
  )
}

export default CreateAlbumForm;