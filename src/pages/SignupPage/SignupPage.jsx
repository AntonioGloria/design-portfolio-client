import "./SignupPage.css";
import { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

import { Button, Form, FormGroup, Toast, Overlay, Card } from "react-bootstrap";
import AuthFormSide from "../../components/AuthFormSide";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showError, setShowError] = useState(false);
  const target = useRef(null);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const toggleShowError = () => {
    setShowError(!showError);
    setErrorMessage(undefined);
  }

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, username };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful, automatically log in new user and
        // redirect them to home page

        authService.login({email, password})
        .then((response) => {
          storeToken(response.data.authToken);
          authenticateUser();
          navigate("/");
        });
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage d-flex align-items-center"
      style={{height: "90vh"}}
    >
      <Card
        className="m-auto flex-row shadow"
      >
        <AuthFormSide/>
        <Card.Body>
          <h3 className="text-start">Sign Up</h3>
          <Form onSubmit={handleSignupSubmit} className="mb-4">
            <FormGroup className="mb-3 text-start" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={handleUsername}/>
            </FormGroup>
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
              className="bg-gradient"
              type="submit"
              ref={target}
              onClick={() => setShowError(!showError)}
            >
              Sign Up
            </Button>
          </Form>
          <p>Already have account?</p>
          <Link to={"/login"}>Log In</Link>
        </Card.Body>
      </Card>

      {errorMessage &&
        <Overlay target={target.current} show={showError} placement="bottom">
          <Toast bg="danger" show={showError} onClose={toggleShowError}>
            <Toast.Header>
              <strong className="me-auto">Sign-Up Error</strong>
            </Toast.Header>
            <Toast.Body>{errorMessage}</Toast.Body>
          </Toast>
        </Overlay>
      }
    </div>
  );
}

export default SignupPage;
