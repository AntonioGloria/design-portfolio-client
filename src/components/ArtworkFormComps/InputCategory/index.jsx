import { Form } from "react-bootstrap";

const InputCategory = (props) => {
  const { vars, funcs } = props;
  const {category, categoryMedia } = vars;
  const {setCategory, setMediumOptions } = funcs;

  const handleMediumOptions = (choice) => {
    setCategory(choice);
    const { media } = categoryMedia.find(cat => cat.value === choice);
    setMediumOptions(media);
  }

  return (
    <Form.Group controlId="category-select" className="m-4 position-relative">
      <Form.Label>Category</Form.Label>
      <Form.Select required value={category} onChange={(e) => handleMediumOptions(e.target.value)}>
        {categoryMedia.map(category =>
          <option key={category.value} value={category.value}>{category.label}</option>
        )}
      </Form.Select>
      <Form.Control.Feedback tooltip type="invalid">Required</Form.Control.Feedback>
    </Form.Group>
  )
}

export default InputCategory