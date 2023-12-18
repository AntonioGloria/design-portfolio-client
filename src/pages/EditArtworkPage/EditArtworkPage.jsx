import { useParams } from 'react-router-dom';
import ArtworkForm from '../../components/ArtworkFormComps/ArtworkForm';

const EditArtworkPage = () => {
  const { _id } = useParams();

  return (
    <ArtworkForm type={"Edit"} artworkId={_id}/>
  );
}

export default EditArtworkPage;