import React from 'react';
import { Tabs, Tab, } from 'react-bootstrap';
import Gallery from "../../components/Gallery";
import UserBioCard from "../../components/UserBioCard";

const UserMainTabs = (props) => {
  const {
    ownArtworks,
    ownAlbums,
    favArtworks,
    favCollections,
    bio,
    email,
    username,
    createdAt
  } = props;

  return (
    <Tabs
      defaultActiveKey="portfolio"
      className="mb-3 bg-dark h4"
      justify
    >
      <Tab eventKey="phl" title="" disabled></Tab>
      <Tab
        eventKey="portfolio"
        title={<><i className="fa-solid fa-images"></i>&emsp;Portfolio</>}
      >
        <Gallery user={username} items={ownAlbums}/>
      </Tab>
      <Tab
        eventKey="favorites"
        title={<><i className="fa-solid fa-star"></i>&emsp;Favorites</>}
      >
        <Gallery user={username} items={favCollections}/>
      </Tab>
      <Tab
        eventKey="about"
        title={<><i className="fa-solid fa-user"></i>&emsp;About</>}
      >
        <UserBioCard
          bio={bio}
          email={email}
          username={username}
          createdAt={createdAt}
        />
      </Tab>
      <Tab eventKey="phr" title="" disabled></Tab>
    </Tabs>
  );
}

export default UserMainTabs;