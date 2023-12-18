import { Form } from "react-bootstrap";

const InputMedium = (props) => {
  const { medium, setMedium, mediumOptions } = props;

  return (
    <Form.Group controlId="medium-select" className="m-4">
      <Form.Label>Medium</Form.Label>
      <Form.Select value={medium} onChange={(e) => setMedium(e.target.value)}>
        <option value="">Choose Medium...</option>
        { mediumOptions.map(option =>
            <option key={option.value} value={option.value}>{option.text}</option>
        )}
      </Form.Select>
    </Form.Group>
  )
}

export default InputMedium