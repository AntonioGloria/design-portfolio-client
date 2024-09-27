import { Card, Form } from "react-bootstrap";

const InputAlbum = (props) => {
  const { vars, funcs } = props;
  const { selectedAlbums, userAlbums } = vars;
  const { setSelectedAlbums } = funcs;

  const handleSelectAlbums = (e) => {
    const { value } = e.target;
    let newSelection;

    selectedAlbums.includes(value)
      ? newSelection = selectedAlbums.filter(album => album !== value)
      : newSelection = [...selectedAlbums, value]

      setSelectedAlbums(newSelection);
  }

  return (
    <div className="m-4 h-25">
      <Form.Label>Album</Form.Label>
      <Card className="bg-secondary p-2 h-75 overflow-y-auto">
      {userAlbums.map(album =>{
        const selected = selectedAlbums.includes(album._id);
        return (
          <Form.Check
            key={album._id}
            className={selected && "bg-dark bg-opacity-25"}
            value={album._id}
            label={album.title}
            checked={selected}
            onChange={(e) => handleSelectAlbums(e)}
          />
        )
      })}
      </Card>
    </div>
  )
}

export default InputAlbum