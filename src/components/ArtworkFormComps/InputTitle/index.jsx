import { Card, Form } from "react-bootstrap";

const InputTitle = (props) => {
  const { title, setTitle } = props;

  return (
    <Card className="m-3">
      <Form.Group controlId="title-text">
        <Card.Header>
          <Form.Label>Artwork Title</Form.Label>
        </Card.Header>
        <Card.Body>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </Card.Body>
      </Form.Group>
    </Card>
  )
}

export default InputTitle