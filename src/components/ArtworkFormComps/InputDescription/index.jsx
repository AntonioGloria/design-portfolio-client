import { Card, Form } from "react-bootstrap";

const InputDescription = (props) => {
  const { description, setDescription } = props

  return (
    <Card className="m-3">
      <Form.Group controlId="description-textarea">
        <Card.Header>
          <Form.Label>Artwork Description</Form.Label>
        </Card.Header>
        <Card.Body>
          <Form.Control
            as="textarea"
            rows={4}
            style={{resize:"none"}}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Card.Body>
      </Form.Group>
    </Card>
  )
}

export default InputDescription