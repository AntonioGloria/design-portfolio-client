import React from 'react';
import { Card } from 'react-bootstrap';
import authFormSide from "../../assets/img/authFormSide.png";

const AuthFormSide = () => {
  return (
    <>
      <Card.Img
        className="w-50"
        src={authFormSide}>
      </Card.Img>
      <Card.ImgOverlay
        className="text-start w-50 d-flex flex-column justify-content-between p-4 bg-primary bg-gradient bg-opacity-25 "
      >
        <h1 className="fw-bold">SHOWCASE YOUR CRAFT!</h1>
        <p>
          Join our community of fellow artists and designers, enjoy amazing
          art and show off your inspiration to the world!
        </p>
      </Card.ImgOverlay>
    </>
  );
}

export default AuthFormSide;