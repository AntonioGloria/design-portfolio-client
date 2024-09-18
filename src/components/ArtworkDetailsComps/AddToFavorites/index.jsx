import { useState } from 'react';
import artworkService from '../../../services/artwork.service';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';

const AddToFavorites = (props) => {
  const { favAlbums, artData, setArtData, user } = props;
  const [isLiked, setIsLiked] = useState(artData.likes.includes(user._id));

  const submitToggleFavs = async () => {
    try {
      let favRes;
      !isLiked
      ? favRes = await artworkService.addToFavs(artData._id)
      : favRes = await artworkService.removeFromFavs(artData._id)

      setArtData(favRes.data);
      setIsLiked(favRes.data.likes.includes(user._id));
    }
      catch (err) {
      console.log(err)
    }
  }

  const addToFavAlbum = (e) => {
    console.log(e.target.value)
  }

  return (
    <div className="text-center">
    <Dropdown as={ButtonGroup} autoClose={false}>
      <Button onClick={submitToggleFavs}>
        {isLiked
          ? <><i className="fa-solid fa-heart me-1"/>Remove</>
          : <><i className="fa-regular fa-heart me-1"/>Add</>
        }
      </Button>
      <Dropdown.Toggle id="favorites-dropdown"></Dropdown.Toggle>
      <Dropdown.Menu variant="dark">
        <Dropdown.Header>Add to your Collections</Dropdown.Header>
        {favAlbums.map(album => {
          return (
            <Dropdown.Item value={album._id} as="button" key={album._id} onClick={addToFavAlbum}>
              {album.title}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
    </div>
  )
}

export default AddToFavorites