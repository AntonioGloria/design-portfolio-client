import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import albumService from '../../services/album.service';

const AlbumPage = () => {
  const { album } = useParams();
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const getArtworks = async () => {
      try {
        const res = await albumService.getOne(album);
        setArtworks(res.data.artworks);
      }
      catch (err) {
        console.log(err);
      }
    }
    getArtworks();
  }, [album]);

  return (
    <div>
      {artworks?.map(artwork => <img src={artwork.assets[0] } alt={artwork.title}/>)}
    </div>
  );
}

export default AlbumPage;