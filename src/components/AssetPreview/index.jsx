import { CloseButton } from "react-bootstrap";
import Artworkthumbnail from "../ArtworkThumbnail";

const AssetPreview = (props) => {
  const { asset, setAssets } = props;

  const handleDeleteAsset = (asset) => {
    setAssets(prev => {
      return prev.filter(item => item !== asset);
    });
  }

  return (
    <div className="text-start" style={{width:"248px", height:"248px"}}>
      <Artworkthumbnail imageSrc={asset}/>
      <CloseButton
        onClick={() => handleDeleteAsset(asset)}
        className="bg-danger border border-dark rounded-circle p-2"
        style={{
          position: "relative",
          top:"-240px",
          left:"205px"
        }}
      />
    </div>
  )
}

export default AssetPreview