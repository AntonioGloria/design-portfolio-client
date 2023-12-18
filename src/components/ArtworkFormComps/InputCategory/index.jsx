import { Form } from "react-bootstrap";

const InputCategory = (props) => {
  const { category, handleMediumOptions } = props;

  return (
    <Form.Group controlId="category-select" className="m-4">
      <Form.Label>Category</Form.Label>
      <Form.Select value={category} onChange={(e) => handleMediumOptions(e.target.value)}>
        <option value="">Choose Category...</option>
        <option value="physicalMedia">Physical Media</option>
        <option value="digitalMedia">Digital Media</option>
        <option value="photography">Photography</option>
      </Form.Select>
    </Form.Group>
  )
}

export default InputCategory