import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AlbumPage from "./pages/AlbumPage/AlbumPage";
import CreateArtworkPage from "./pages/CreateArtworkPage/CreateArtworkPage";
import ArtworkDetailsPage from "./pages/ArtworkDetailsPage/ArtworkDetailsPage";

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
        <Route path="/:username" element={<ProfilePage/>}/>
        <Route path="/:username/edit-profile" element={<IsPrivate><EditProfilePage/></IsPrivate>}/>
        <Route path="/:username/albums/:album" element={<AlbumPage/>}/>
        <Route path="/:username/create-artwork" element={<CreateArtworkPage/>}/>
        <Route path="/artworks/:artwork" element={<ArtworkDetailsPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
