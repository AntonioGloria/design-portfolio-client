import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import artworkService from "../../services/artwork.service";
import { Container, Row, Col } from 'react-bootstrap';
import ArtworkThumbnail from '../../components/ArtworkThumbnail';
import EmptySection from "../../components/EmptySection";

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
      {category &&
        <h1 className='my-4'>
          {`Browsing ${parseCategory(category)}`} { medium && `> ${parseMedium(medium)}`}
        </h1>
      }

      {artworks.length === 0 && <EmptySection item="Artworks"/>}

      <Container fluid style={{width: "95.2vw"}}>
        <Row className="row-cols-auto g-3">
        {artworks?.map(({assets, _id}) =>
          <Col key={_id}>
          <Link to={`/artworks/${_id}`}>
            <ArtworkThumbnail imageSrc={assets[0]}/>
          </Link>
          </Col>
        )}
        </Row>
      </Container>
    </div>
  )
}

export default ArtworkGalleryPage;