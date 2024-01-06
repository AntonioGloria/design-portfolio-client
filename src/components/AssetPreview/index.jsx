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
      <Row xl={4}>
        {assets.map((asset, i) => {
          return (
            <Col key={i} className="gx-1">
              <div className="position-relative">
                <Artworkthumbnail imageSrc={asset}/>
                <CloseButton
                  onClick={() => handleDeleteAsset(asset)}
                  className="bg-danger rounded-circle p-2 position-absolute"
                  style={{
                    top:"5px",
                    right:"-12.5px"
                  }}
                />
              </div>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default AssetPreview