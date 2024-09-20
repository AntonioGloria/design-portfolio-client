import { Overlay, Toast } from "react-bootstrap"

const ErrorToast = (props) => {
  const { target, title, placement, msg, setMsg, show, setShow } = props;

  const toggleShow = () => {
    setShow(!show);
    setMsg(undefined);
  }

  return (
    <Overlay target={target.current} show={show} placement={placement}>
      <Toast bg="danger" show={show} onClose={toggleShow}>
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{msg}</Toast.Body>
      </Toast>
    </Overlay>
  )
}

export default ErrorToast