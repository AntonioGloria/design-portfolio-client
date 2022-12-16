import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Route, Routes, Link } from 'react-router-dom';
import AlbumGallery from "../AlbumGallery";
import ArtworkGallery from "../ArtworkGallery";
import FavoritesGallery from "../FavoritesGallery";
import UserBioCard from "../../components/UserBioCard";

const UserMainTabs = (props) => {
  const {
    ownAlbums,
    favCollections,
    bio,
    email,
    username,
    createdAt
  } = props;

  return (
    <Tabs
      defaultActiveKey="portfolio"
      className="mb-3 bg-dark h5"
      justify
    >
      <Tab eventKey="phl" title="" disabled></Tab>
      <Tab
        eventKey="portfolio"
        title={<Link to={`/${username}`} className="nav-link"><i className="fa-solid fa-images"></i>&emsp;Portfolio</Link>}
      >
        <Routes>
            <Route path="/" element={<AlbumGallery user={username} albums={ownAlbums}/>}/>
            <Route path="/albums/:album" element={<ArtworkGallery/>}/>
          </Routes>
      </Tab>
      <Tab
        eventKey="favorites"
        title={<Link to={`/${username}`} className="nav-link"><i className="fa-solid fa-star"></i>&emsp;Favorites</Link>}
      >
        <Routes>
          <Route path="/" element={<FavoritesGallery user={username} albums={favCollections}/>}/>
          <Route path="/favorites/:album" element={<ArtworkGallery/>}/>
        </Routes>
      </Tab>
      <Tab
        eventKey="about"
        title={<Link to={`/${username}`} className="nav-link"><i className="fa-solid fa-user"></i>&emsp;About</Link>}
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