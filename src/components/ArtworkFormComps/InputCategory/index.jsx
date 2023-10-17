import { Card, Form } from "react-bootstrap";

const InputCategory = (props) => {
  const { category, setCategory, setMediumOptions } = props.share;

  const physOptions = [
    {value: "physDrawing", text : "Drawing"},
    {value: "physPainting", text: "Painting"},
    {value:"physSculpture", text: "Sculpture"}
  ];

  const digiOptions = [
    {value: "digiDrawing", text: "Digital Drawing"},
    {value: "digiPainting", text: "Digital Painting"},
    {value: "digi3DArt", text: "3D Art"}
  ];

  const photoOptions = [
    {value: "photoPortrait", text: "Portrait"},
    {value: "photoNature", text: "Nature"},
    {value: "photoMacro", text: "Macro"}
  ];

  const handleMedium = (choice) => {
    setCategory(choice);

    switch(choice) {
      case "physicalMedia":
        setMediumOptions(physOptions);
        break;

      case "digitalMedia":
          setMediumOptions(digiOptions);
          break;

      case "photography":
        setMediumOptions(photoOptions);
        break;

      default:
        setMediumOptions([]);
    }
  }

  return (
    <Card className="m-3">
      <Form.Group controlId="category-select">
        <Card.Header>
          <Form.Label>Category</Form.Label>
        </Card.Header>
        <Card.Body>
          <Form.Select value={category} onChange={(e) => handleMedium(e.target.value)}>
            <option value="">Choose Category...</option>
            <option value="physicalMedia">Physical Media</option>
            <option value="digitalMedia">Digital Media</option>
            <option value="photography">Photography</option>
          </Form.Select>
        </Card.Body>
      </Form.Group>
    </Card>
  )
}

export default InputCategory