import React from 'react';
import moment from "moment";
import { Card } from 'react-bootstrap';

const UserBioCard = (props) => {
  const { username, bio, email, createdAt } = props;
  return (
    <Card className="w-50 m-auto shadow">
      <Card.Header className="text-center">
        <h4>{username}'s Bio</h4>
      </Card.Header>
      <Card.Body>
        <p>&emsp;{bio}</p>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-around">
        <span className="h5">Contact: <a href={`mailto:${email}`}>{email}</a></span>
        <span className="h5">Joined: {moment(createdAt).format('MMM DD, YYYY')}</span>
      </Card.Footer>
    </Card>
  );
}

export default UserBioCard;