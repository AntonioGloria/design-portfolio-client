import { Card, Form } from "react-bootstrap";

const InputMedium = (props) => {
  const { medium, setMedium, mediumOptions } = props;

  return (
    <Card className="m-3">
      <Form.Group controlId="medium-select">
        <Card.Header>
          <Form.Label>Medium</Form.Label>
        </Card.Header>
        <Card.Body>
          <Form.Select value={medium} onChange={(e) => setMedium(e.target.value)}>
            <option value="">Choose Medium...</option>
            { mediumOptions.map(option =>
                <option key={option.value} value={option.value}>{option.text}</option>
            )}
          </Form.Select>
        </Card.Body>
      </Form.Group>
    </Card>
  )
}

export default InputMedium