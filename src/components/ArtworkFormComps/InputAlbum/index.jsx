import { Form } from "react-bootstrap";

const InputAlbum = (props) => {
  const { selectedAlbums, setSelectedAlbums, userAlbums } = props;

  const handleSelectAlbums = (e) => {
    const allOptions = [...e.target.children];

    const selected = allOptions.filter(option => {
      return option.selected;
    });

    const selectedValues = selected.map(selected => {
      return selected.value;
    });

    selectedValues.unshift(userAlbums[0]._id);
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
        {userAlbums.map((album, i) =>
          i !== 0 &&
            <option key={album._id} value={album._id}>
              {album.title}
            </option>
        )}
      </Form.Select>
    </Form.Group>
  )
}

export default InputAlbum