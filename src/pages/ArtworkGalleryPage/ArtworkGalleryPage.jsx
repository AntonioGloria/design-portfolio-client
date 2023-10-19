import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ArtworkThumbnail from '../../components/ArtworkThumbnail';
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
        <Link key={_id} to={`/artworks/${_id}`}>
          <ArtworkThumbnail imageSrc={assets[0]}/>
        </Link>
      )}
      </div>
    </div>
  )
}

export default ArtworkGalleryPage;