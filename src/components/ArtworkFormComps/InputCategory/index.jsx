import { Form } from "react-bootstrap";

const InputCategory = (props) => {
  const { vars, funcs } = props;
  const {category, categoryMedia } = vars;
  const {setCategory, setMediumOptions } = funcs;

  const handleMediumOptions = (choice) => {
    setCategory(choice);
    setMediumOptions(categoryMedia[choice]);
  }

  return (
    <Form.Group controlId="category-select" className="m-4 position-relative">
      <Form.Label>Category</Form.Label>
      <Form.Select required value={category} onChange={(e) => handleMediumOptions(e.target.value)}>
        <option value="">Choose Category...</option>
        <option value="physicalMedia">Physical Media</option>
        <option value="digitalMedia">Digital Media</option>
        <option value="photography">Photography</option>
      </Form.Select>
      <Form.Control.Feedback tooltip type="invalid">Required</Form.Control.Feedback>
    </Form.Group>
  )
}

export default InputCategory