import { Form } from "react-bootstrap";

const InputAlbum = (props) => {
  const { vars, funcs } = props;
  const { selectedAlbums, userAlbums } = vars;
  const { setSelectedAlbums } = funcs;

  const handleSelectAlbums = (e) => {
    const { selectedOptions } = e.target;
    const selectedValues = [...selectedOptions].map(selected => {
      return selected.value;
    });

    setSelectedAlbums(selectedValues);
  }

  return (
    <Form.Group controlId="album-select" className="m-4">
      <Form.Label>Album</Form.Label>
      <Form.Select
        defaultValue={selectedAlbums}
        onChange={(e) => handleSelectAlbums(e)}
        style={{overflow:'auto'}}
        multiple={true}
      >
        {userAlbums.map(album =>
          <option key={album._id} value={album._id}>
            {album.title}
          </option>
        )}
      </Form.Select>
    </Form.Group>
  )
}

export default InputAlbum