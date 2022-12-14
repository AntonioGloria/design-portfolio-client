import "./ProfilePage.css";
import { useState, useEffect } from "react";
import userService from "../../services/user.service";
import { useParams } from "react-router-dom";
import UserHeader from "../../components/UserHeader";
import { Tabs, Tab, Card } from 'react-bootstrap';
import Gallery from "../../components/Gallery";
import moment from "moment";

function ProfilePage() {
  const { username } = useParams();
  const [userData, setUserData] = useState([]);
  const {
    email,
    avatar,
    coverImg,
    bio,
    createdAt,
    ownArtworks,
    ownAlbums,
    favArtworks,
    favCollections
  } = userData;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await userService.getOne(username);
        setUserData(res.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    getUserData();
  }, [username]);

  return (
    <>
      <UserHeader username={username} avatar={avatar} coverImg={coverImg}/>
      <Tabs
        defaultActiveKey="portfolio"
        className="mb-3"
        justify
      >
      <Tab
        eventKey="portfolio"
        title={
          <>
            <i className="fa-solid fa-images"></i>
            &emsp;Portfolio
          </>
        }
      >
        <Gallery albums={ownAlbums}/>
      </Tab>
      <Tab
        eventKey="favorites"
        title={
          <>
            <i className="fa-solid fa-star"></i>
            &emsp;Favorites
          </>
        }
      >
        <Gallery albums={favCollections}/>
      </Tab>
      <Tab
        eventKey="about"
        title={
          <>
            <i className="fa-solid fa-user"></i>
            &emsp;About
          </>
        }
      >
        <Card className="w-50 m-auto shadow">
          <Card.Header className="text-center">
            <h3>{username}'s Bio</h3>
          </Card.Header>
          <Card.Body>
            <p className="h5">&emsp;{bio}</p>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-around">
            <span className="h4">Contact: <a href={`mailto:${email}`}>{email}</a></span>
            <span className="h4">Joined: {moment(createdAt).format('MMM DD, YYYY')}</span>
          </Card.Footer>
        </Card>
      </Tab>
    </Tabs>
    </>
  );
}

export default ProfilePage;
