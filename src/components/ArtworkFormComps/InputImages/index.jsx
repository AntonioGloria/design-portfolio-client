import { useState } from "react";
import { Form, ProgressBar, Row, Col, Container } from "react-bootstrap";
import filesService from '../../../services/files.service';
import AssetPreview from "../../AssetPreview";
import EmptySection from "../../EmptySection";

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
    <Form.Group controlId="assets-file" className="m-4">
      <Form.Label>{"Upload Artwork Image(s)"}</Form.Label>
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
          <Row>
            {assets.map((asset, i) => {
              return (
                <Col key={i} className="gx-1">
                  <AssetPreview asset={asset} setAssets={setAssets}/>
                </Col>
              )
            })}
          </Row>
          :
          <EmptySection item={"Images"}/>
        }
      </Container>
    </Form.Group>
  )
}

export default InputImages