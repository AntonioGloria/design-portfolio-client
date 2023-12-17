import { useState } from "react";
import { Card, Form, ProgressBar, Row, Col, Container } from "react-bootstrap";
import filesService from '../../../services/files.service';
import AssetPreview from "../../AssetPreview";
import ArtworkThumbnail from "../../ArtworkThumbnail";

const InputImages = (props) => {
  const { assets, setAssets } = props;

  const [progressBar, setProgressBar] = useState(0);
  const [uploadStart, setUploadStart] = useState(false);

  const handleAssetUploads = async (e) => {
    try {
      const uploadData = new FormData();
      const fileList = e.target.files;
      setUploadStart(true);

      for (const file of fileList) {
        uploadData.append("imageUrl", file);
      };

      const res = await filesService.uploadImageMulti(uploadData,
        {
          onUploadProgress: e => {
            setProgressBar(Math.round(e.loaded/e.total*100, 0));
          }
        }
      );

      setAssets([...assets, ...res.data.fileUrls]);
      setUploadStart(false);
      setProgressBar(0);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <Card className="m-3">
      <Form.Group controlId="assets-file">
        <Card.Header>
          <Form.Label>{"Upload Artwork Image(s)"}</Form.Label>
        </Card.Header>
        <Card.Body>
          <Form.Control type="file" multiple onChange={handleAssetUploads}/>
          { uploadStart &&
            <div className="mt-3">
              <p className="mb-1 text-center">
                {progressBar < 100
                  ? "Upload in progress..."
                  : "Upload Completed!"}
              </p>
              <ProgressBar
                now={progressBar}
                label={`${progressBar}%`}
                style={{
                  height: "2em",
                  fontWeight: "bold",
                  textShadow: "0 0 3px black",
                }}
              />
            </div>
          }
          <Container className="m-3 text-center">
            { assets.length > 0 ?
              <>
                <p className="text-center">Artwork Images</p>
                <Row>
                  {assets.map((asset, i) => {
                    return (
                      <Col key={i} className="gx-1">
                        <AssetPreview asset={asset} setAssets={setAssets}/>
                      </Col>
                    )
                  })}
                </Row>
              </>
              :
              <>
              <p className="text-center">No Images Yet</p>
              <ArtworkThumbnail imageSrc={"https://res.cloudinary.com/dwhznw5ny/image/upload/v1702842616/design-portfolio/ui-defaults/defaultAlbum_zxv3sr.png"}/>
              </>
            }
          </Container>
        </Card.Body>
      </Form.Group>
    </Card>
  )
}

export default InputImages