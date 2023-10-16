import { Card, Form } from "react-bootstrap";

const InputCategory = (props) => {
  const { category, handleMedium } = props;

  return (
    <Card className="m-3">
      <Form.Group controlId="category-select">
        <Card.Header>
          <Form.Label>Category</Form.Label>
        </Card.Header>
        <Card.Body>
          <Form.Select value={category} onChange={(e) => handleMedium(e)}>
            <option>Choose Category...</option>
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