import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import albumService from "../../../services/album.service";

const CreateAlbumForm = (props) => {
  const { creator, albums, setAlbums, type } = props;
  const [title, setTitle] = useState("");

  const typeTxt = type[0].toUpperCase() + type.slice(1, -1);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const newAlbum = await albumService.create({
        title,
        creator
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
        <Button type="submit">
          <i className="fa-solid fa-folder-plus"/>
          &nbsp;&nbsp;Create Album
        </Button>
      </InputGroup>
    </Form>
  )
}

export default CreateAlbumForm;