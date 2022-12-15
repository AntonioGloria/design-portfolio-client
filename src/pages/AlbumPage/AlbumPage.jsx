import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import albumService from '../../services/album.service';

const AlbumPage = () => {
  const { album } = useParams();
  const [albumData, setAlbumData] = useState({});
  const { title, artworks } = albumData

  useEffect(() => {
    const getAlbumData = async () => {
      try {
        const res = await albumService.getOne(album);
        setAlbumData(res.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    getAlbumData();
  }, [album]);

  return (
    <div className="m-auto text-center">
      <h1>{title}</h1>
      {artworks?.map(({ _id, assets }) =>
        <Link to={`/artworks/${_id}`} key={_id}>
          <Image
            thumbnail={true}
            src={assets[0]}
            style={{width:"200px", height:"200px", objectFit:"cover"}}
          />
        </Link>
      )}
    </div>
  );
}

export default AlbumPage;