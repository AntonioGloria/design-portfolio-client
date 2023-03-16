import { Button, DropdownButton } from "react-bootstrap";

const AlbumCardControls = (props) => {
  const { id } = props;

  const handleEdit = (e) => {
    e.preventDefault();
    console.log("edit", id);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("delete", id);
  }

  return (
    <DropdownButton
      variant="secondary"
      menuVariant="dark"
      size="sm"
      drop="bottom"
      title=<i className="fa-solid fa-gear"/>
      style={{position: "absolute"}}
    >
      <div className="d-flex justify-content-around p-1">
        <Button variant="warning" onClick={handleEdit}>
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