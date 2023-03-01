import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Thumbnail from '../../components/Thumbnail';
import artworkService from "../../services/artwork.service";

const parseCategory = categoryQuery => {
  const words = categoryQuery.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  const firstChar = words[0].toUpperCase()
  const restOfStr = words.substring(1);
  return firstChar + restOfStr;
}

const parseMedium = mediumQuery => {
  const prefixes = ['phys', 'digi', 'photo'];
  const match = prefixes.find(prefix => mediumQuery.includes(prefix));
  return mediumQuery.replace(match, '');
}

const ArtworkGalleryPage = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const { category, medium } = params;
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const getArtworksData = async () => {
      try {
        const res = await artworkService.getCategoryMedia(category, medium);
        setArtworks(res.data);
      }
      catch(err) {
        console.log(err);
      }
    }
    getArtworksData();
  }, [category, medium]);

  return (
    <div className='text-center'>
        {category && medium &&
          <h1>{`Browsing ${parseCategory(category)} > ${parseMedium(medium)}`}</h1>
        }
        {category && !medium &&
          <h1>{`Browsing ${parseCategory(category)}`}</h1>
        }
        <div className='d-flex justify-content-center'>
      {artworks?.map(({assets, _id}) =>
        <Thumbnail imageSrc={assets[0]} id={_id} key={_id}/>
      )}
      </div>
    </div>
  )
}

export default ArtworkGalleryPage;