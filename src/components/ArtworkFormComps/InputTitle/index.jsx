import { Form } from "react-bootstrap";

const InputTitle = (props) => {
  const { title, setTitle } = props;

  return (
    <Form.Group controlId="title-text" className="m-4">
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
    </Form.Group>
  )
}

export default InputTitle