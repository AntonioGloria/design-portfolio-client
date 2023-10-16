import { useState } from "react";
import { Card, Form, ProgressBar } from "react-bootstrap";
import filesService from '../../../services/files.service';

const InputImages = (props) => {
  const { setAssets } = props;

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
      setAssets(res.data.fileUrls);
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
        </Card.Body>
      </Form.Group>
    </Card>
  )
}

export default InputImages