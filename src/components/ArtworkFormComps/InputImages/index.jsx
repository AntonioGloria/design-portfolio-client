import { useState, useRef } from "react";
import { Form, ProgressBar } from "react-bootstrap";
import filesService from '../../../services/files.service';
import AssetPreview from "../../AssetPreview";
import EmptySection from "../../EmptySection";
import ErrorToast from "../../ErrorToast";

const InputImages = (props) => {
  const { assets, setAssets, setDeleteAssets, validated } = props;

  const [progressBar, setProgressBar] = useState(0);
  const [uploadStart, setUploadStart] = useState(false);
  const [errorMsg, setErrorMsg] = useState(undefined);
  const [showError, setShowError] = useState(false);

  const target = useRef();

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
    catch (error) {
      setErrorMsg("Something went wrong - please try again.");
      setShowError(true);
      setUploadStart(false);
      setProgressBar(0);
    }
  }

  return (
    <>
    <Form.Group controlId="assets-file" className="m-4 position-relative" ref={target}>
      <Form.Label>{"Upload Artwork Image(s)"}</Form.Label>
      {!uploadStart && !errorMsg &&
        <>
          <Form.Control type="file" multiple onChange={handleAssetUploads} isInvalid={assets.length === 0 && validated}/>
          <Form.Control.Feedback tooltip type="invalid">You must add at least 1 image!</Form.Control.Feedback>
        </>
      }

      {uploadStart && !errorMsg &&
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
    </Form.Group>

    {assets.length > 0
      ? <AssetPreview assets={assets} setAssets={setAssets} setDeleteAssets={setDeleteAssets}/>
      : <EmptySection item={"Images"}/>
    }

    {errorMsg &&
      <ErrorToast
        target={target}
        title="Upload Error"
        placement="bottom"
        msg={errorMsg}
        setMsg={setErrorMsg}
        show={showError}
        setShow={setShowError}
      />
    }
    </>
  )
}

export default InputImages