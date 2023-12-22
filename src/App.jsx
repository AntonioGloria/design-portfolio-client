import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CreateArtworkPage from "./pages/CreateArtworkPage/CreateArtworkPage";
import EditArtworkPage from "./pages/EditArtworkPage/EditArtworkPage";
import ArtworkDetailsPage from "./pages/ArtworkDetailsPage/ArtworkDetailsPage";
import ArtworkGalleryPage from "./pages/ArtworkGalleryPage/ArtworkGalleryPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<IsAnon><SignupPage/></IsAnon>}/>
        <Route path="/login" element={<IsAnon><LoginPage/></IsAnon>}/>
        <Route path="/:username/*" element={<ProfilePage/>}/>
        <Route path="/:username/edit-profile" element={<IsPrivate><EditProfilePage/></IsPrivate>}/>
        <Route path="/artworks/create" element={<IsPrivate><CreateArtworkPage/></IsPrivate>}/>
        <Route path="/artworks/:_id/edit" element={<IsPrivate><EditArtworkPage/></IsPrivate>}/>
        <Route path="/artworks" element={<ArtworkGalleryPage/>}/>
        <Route path="/artworks/:_id" element={<ArtworkDetailsPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
