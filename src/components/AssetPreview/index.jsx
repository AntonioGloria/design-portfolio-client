import { CloseButton, Container, Row, Col } from "react-bootstrap";
import Artworkthumbnail from "../ArtworkThumbnail";

const AssetPreview = (props) => {
  const { assets, setAssets, setDeleteAssets } = props;

  const handleDeleteAsset = (asset) => {
    setAssets(prev => prev.filter(item => item !== asset));
    setDeleteAssets(prev => [...prev, asset]);
  }

  return (
    <Container>
      <Row className="row-cols-auto g-3 mt-3">
        {assets.map((asset, i) =>
          <Col key={i}>
            <div className="position-relative">
              <Artworkthumbnail imageSrc={asset}/>
              <CloseButton
                onClick={() => handleDeleteAsset(asset)}
                className="bg-danger rounded-circle p-2 position-absolute top-0 start-100 translate-middle"
              />
            </div>
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default AssetPreview