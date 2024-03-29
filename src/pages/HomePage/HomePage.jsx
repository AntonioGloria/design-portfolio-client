import "./HomePage.css";
import JutsuLogo from "../../assets/img/JutsuLogo.svg"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import artworkService from "../../services/artwork.service";
import { Container, Row, Col } from "react-bootstrap";
import ArtworkThumbnail from "../../components/ArtworkThumbnail";
import Loading from "../../components/Loading/Loading";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await artworkService.getAll();
      setArtworks(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  if (isLoading) {
    return <Loading/>
  }

  return (
    <>
      <header className="text-center">
        <h1 className="display-1">Welcome to</h1>
        <img src={JutsuLogo} alt="jutsu-logo"/>
        <h1 className="text-muted">The Place to Show and Grow Your Craft</h1>
      </header>
      <Container>
        <Row xs={"auto"}>
          { artworks.map(({_id, assets}) => {
            return (
              <Col key={_id}>
                <Link to={`/artworks/${_id}`}>
                  <ArtworkThumbnail imageSrc={assets[0]}/>
                </Link>
              </Col>
            )
          })}
        </Row>
      </Container>
    </>
  );
}

export default HomePage;