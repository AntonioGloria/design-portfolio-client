import { Card, Form } from "react-bootstrap";

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
    <Card className="m-3">
      <Form.Group controlId="album-select">
        <Card.Header>
          <Form.Label>Album</Form.Label>
        </Card.Header>
        <Card.Body>
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
        </Card.Body>
      </Form.Group>
    </Card>
  )
}

export default InputAlbum