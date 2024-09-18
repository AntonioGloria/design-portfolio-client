import { useState } from 'react';
import artworkService from '../../../services/artwork.service';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';

const AddToFavorites = (props) => {
  const { userFavorites, setUserFavorites, artData, setArtData, user } = props;
  const [isLiked, setIsLiked] = useState(artData.likes.includes(user._id));

  const submitToggleFavs = async () => {
    try {
      if (isLiked) {
        const remFavRes = await artworkService.removeFromFavs(artData._id);
        const { artworkMinusFav, albumsMinusFav } = remFavRes.data;

        setArtData(artworkMinusFav);
        setUserFavorites(albumsMinusFav);
        setIsLiked(artworkMinusFav.likes.includes(user._id));
      }

      else {
        const addFavRes = await artworkService.addToFavs(artData._id);

        setArtData(addFavRes.data);
        setIsLiked(addFavRes.data.likes.includes(user._id));
      }
    }
      catch (err) {
      console.log(err)
    }
  }

  const submitToggleFavAlbum = async (e) => {
    const { value } = e.target;
    let albumRes;
    const favAlbum = userFavorites.find(fav => fav._id === value);

    try {
      if (favAlbum.artworks.some(art => art._id === artData._id)) {
        albumRes = await artworkService.removeFromFavAlbum(artData._id, value);
      }

      else {
        albumRes = await artworkService.addToFavAlbum(artData._id, value);

        // Also add to artwork favorites
        const addFavRes = await artworkService.addToFavs(artData._id);
        setArtData(addFavRes.data);
        setIsLiked(addFavRes.data.likes.includes(user._id));
      }

      setUserFavorites(albumRes.data);
    }

    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="text-center">
    <Dropdown as={ButtonGroup} autoClose={false}>
      <Button onClick={submitToggleFavs}>
        {isLiked
          ? <><i className="fa-solid fa-heart me-2"/>Remove</>
          : <><i className="fa-regular fa-heart me-2"/>Add</>
        }
      </Button>
      {userFavorites.length > 0 &&
        <>
          <Dropdown.Toggle id="favorites-dropdown"></Dropdown.Toggle>
          <Dropdown.Menu align="end" variant="dark">
            <Dropdown.Header>Add to your Collections</Dropdown.Header>
            {userFavorites.map(album => {
              return (
                <Dropdown.Item
                  key={album._id}
                  value={album._id}
                  as="button"
                  onClick={submitToggleFavAlbum}
                >
                  {album.artworks.some(art => art._id === artData._id)
                    ? <i className="fa-solid fa-square-check me-2 text-primary"/>
                    : <i className="fa-regular fa-square me-2 text-primary"/>
                  }
                  {album.title}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </>
      }
    </Dropdown>
    </div>
  )
}

export default AddToFavorites