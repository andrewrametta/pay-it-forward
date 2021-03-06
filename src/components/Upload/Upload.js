import React, { useState } from "react";
import AuthAPIService from "../../services/auth-api-service";
import Spinner from "../Spinner/Spinner";
import "./Upload.css";

function Upload(props) {
  const [uploadError, setUploadError] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [resizeUrl, setResizeUrl] = useState("");
  const [loggedInState, setLoggedInState] = useState(null);
  const { setImgUrl, setPreviewSource, setShowForm } = props;

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    uploadPhotos(e);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    //convert img to url
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setShowButton(true);
      setShowForm(false);
      setUploadError("");
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    setLoggedInState(true);
    setUploadError(null);
    if (!resizeUrl) return;
    AuthAPIService.uploadImg(resizeUrl)
      .then((img) => {
        setImgUrl(img.public_id);
        setLoggedInState(null);
        setShowForm(true);
        setShowButton(false);
        setUploadError("");
      })
      .catch((res) => {
        setUploadError("Something went wrong, try again");
        setLoggedInState(null);
      });
  };

  const uploadPhotos = function (e) {
    // Read in file
    const file = e.target.files[0];

    // Ensure it's an image
    if (file.type.match(/image.*/)) {
      // Load the image
      const reader = new FileReader();
      reader.onload = function (readerEvent) {
        const image = new Image();
        image.onload = function (imageEvent) {
          // Resize the image
          let canvas = document.createElement("canvas"),
            max_size = 544,
            width = image.width,
            height = image.height;
          if (width > height) {
            if (width > max_size) {
              height *= max_size / width;
              width = max_size;
            }
          } else {
            if (height > max_size) {
              width *= max_size / height;
              height = max_size;
            }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d").drawImage(image, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg");
          setResizeUrl(dataUrl);
        };
        image.src = readerEvent.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="App">
      {loggedInState && <Spinner />}
      <form onSubmit={handleSubmitFile}>
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          className="form-input"
          aria-label="upload-image"
          required
        />

        <div className="img-upload">
          {resizeUrl && (
            <img className="upload-image" src={resizeUrl} alt="chosen-img" />
          )}
        </div>
        {uploadError ? (
          <h3 className="error-message">
            {"Error uploading file, try smaller image"}
          </h3>
        ) : null}
        {showButton ? (
          <div className="submit-button">
            <button className="form-btn" type="submit">
              Next
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default Upload;
