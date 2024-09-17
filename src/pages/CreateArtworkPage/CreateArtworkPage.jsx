import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import userService from '../../services/user.service';
import ArtworkForm from '../../components/ArtworkFormComps/ArtworkForm';

const CreateArtworkPage = () => {
  const { user } = useContext(AuthContext);
  const [albumData, setAlbumData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const userAlbumsRes = await userService.getUserAlbums(user.username, "albums");
        setAlbumData(userAlbumsRes.data);
      }
      catch (err) {
        console.log(err);
      }
    }

    getData();
  }, [user]);

  return (
    <ArtworkForm type={"Create"} albumData={albumData}/>
  );
}

export default CreateArtworkPage;