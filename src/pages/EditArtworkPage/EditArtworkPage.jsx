import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { useParams } from 'react-router-dom';
import userService from '../../services/user.service';
import artworkService from '../../services/artwork.service';
import ArtworkForm from '../../components/ArtworkFormComps/ArtworkForm';

const EditArtworkPage = () => {
  const { artworkId } = useParams();
  const { user } = useContext(AuthContext);
  const [artData, setArtData] = useState(null)
  const [albumData, setAlbumData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const userAlbumsRes = await userService.getUserAlbums(user.username, "albums");
        const artRes = await artworkService.getOne(artworkId);

        setAlbumData(userAlbumsRes.data);
        setArtData(artRes.data);
      }
      catch (err) {
        console.log(err);
      }
    }

    getData();
  }, [artworkId, user]);

  return (
    <ArtworkForm type={"Edit"} albumData={albumData} artData={artData}/>
  );
}

export default EditArtworkPage;