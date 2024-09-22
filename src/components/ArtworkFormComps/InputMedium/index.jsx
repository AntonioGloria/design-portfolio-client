import { Form } from "react-bootstrap";

const InputMedium = (props) => {
  const { medium, setMedium, mediumOptions } = props;

  return (
    <Form.Group controlId="medium-select" className="m-4 position-relative">
      <Form.Label>Medium</Form.Label>
      <Form.Select required value={medium} onChange={(e) => setMedium(e.target.value)}>
        <option value="">Choose Medium...</option>
        { mediumOptions.map(option =>
          <option key={option.value} value={option.value}>{option.label}</option>
        )}
      </Form.Select>
      <Form.Control.Feedback tooltip type="invalid">Required</Form.Control.Feedback>
    </Form.Group>
  )
}

export default InputMedium