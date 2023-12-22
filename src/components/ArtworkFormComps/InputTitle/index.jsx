import { Form } from "react-bootstrap";

const InputTitle = (props) => {
  const { title, setTitle } = props;

  return (
    <Form.Group controlId="title-text" className="m-4 position-relative">
      <Form.Label>Title</Form.Label>
      <Form.Control required type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <Form.Control.Feedback tooltip type="invalid">Required</Form.Control.Feedback>
    </Form.Group>
  )
}

export default InputTitle