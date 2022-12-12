import "./LoginPage.css";
import { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

import { Button, Form, FormGroup, Toast, Overlay, Card } from "react-bootstrap";
import AuthFormSide from "../../components/AuthFormSide";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showError, setShowError] = useState(false);
  const target = useRef(null);

  const toggleShowError = () => {
    setShowError(!showError);
    setErrorMessage(undefined);
  }

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage d-flex align-items-center"
      style={{height: "90vh"}}
    >
      <Card
        className="m-auto flex-row shadow"
      >
        <AuthFormSide/>
        <Card.Body>
          <h3 className="text-start">Log In</h3>
          <Form onSubmit={handleLoginSubmit} className="mb-4">
            <FormGroup className="mb-3 text-start" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={email} onChange={handleEmail}/>
            </FormGroup>

            <FormGroup className="mb-3 text-start" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={handlePassword}
              />
            </FormGroup>
            <Button
              variant="primary"
              type="submit"
              ref={target}
              onClick={() => setShowError(!showError)}
            >
              Login
            </Button>
          </Form>
          <p>Don't have an account yet?</p>
          <Link to={"/signup"}>Sign Up</Link>
        </Card.Body>
      </Card>

      {errorMessage &&
        <Overlay target={target.current} show={showError} placement="bottom">
          <Toast bg="danger" show={showError} onClose={toggleShowError}>
            <Toast.Header>
              <strong className="me-auto">Log-In Error</strong>
            </Toast.Header>
            <Toast.Body>{errorMessage}</Toast.Body>
          </Toast>
        </Overlay>
      }
    </div>
  );
}

export default LoginPage;
