import React from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { Route, Routes, NavLink } from 'react-router-dom';
import AlbumGallery from "../AlbumGallery";
import ArtworkGallery from "../ArtworkGallery";
import FavoritesGallery from "../FavoritesGallery";
import UserBioCard from "../../components/UserBioCard";

const UserMainTabs = (props) => {
  const {
    //ownArtworks,
    ownAlbums,
    //favArtworks,
    favCollections,
    bio,
    email,
    username,
    createdAt
  } = props;

  return (
    <Tab.Container>
      <Nav justify variant="tabs" className="bg-dark mb-3">
        <Nav.Item>
          <Nav.Link eventKey="phl" disabled></Nav.Link>
        </Nav.Item>

        <Nav.Link
          as={NavLink}
          to={`/${username}/albums`}
          className='nav-item'
          eventKey="portfolio">
          <i className="fa-solid fa-images"></i>&emsp;Portfolio
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to={`/${username}/favorites`}
          className="nav-item"
          eventKey="favorites">
          <i className="fa-solid fa-star"></i>&emsp;Favorites
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to={`/${username}/about`}
          className="nav-item"
          eventKey="about">
          <i className="fa-solid fa-user"></i>&emsp;About
        </Nav.Link>

        <Nav.Item>
          <Nav.Link eventKey="ph2" disabled></Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab.Content>
        <Tab.Pane eventKey="portfolio">
          <Routes>
            <Route path="/albums" element={<AlbumGallery user={username} albums={ownAlbums}/>}/>
            <Route path="/albums/:album" element={<ArtworkGallery/>}/>
          </Routes>
        </Tab.Pane>

        <Tab.Pane eventKey="favorites">
          <Routes>
            <Route path="/favorites" element={<FavoritesGallery user={username} albums={favCollections}/>}/>
            <Route path="/favorites/:album" element={<ArtworkGallery/>}/>
          </Routes>
        </Tab.Pane>

        <Tab.Pane eventKey="about">
          <UserBioCard
            bio={bio}
            email={email}
            username={username}
            createdAt={createdAt}
          />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
}

export default UserMainTabs;