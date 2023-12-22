import { Form } from "react-bootstrap";

const InputDescription = (props) => {
  const { description, setDescription } = props

  return (
    <Form.Group controlId="description-textarea" className="m-4 position-relative">
      <Form.Label>Description</Form.Label>
      <Form.Control
        required
        as="textarea"
        rows={4}
        style={{resize:"none"}}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Form.Control.Feedback tooltip type="invalid">Required</Form.Control.Feedback>
    </Form.Group>
  )
}

export default InputDescription