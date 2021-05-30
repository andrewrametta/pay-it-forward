import React, { useState } from "react";
import AuthAPIService from "../../services/auth-api-service";
import config from "../../config";

function Upload(props) {
  const [uploadError, setUploadError] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [resizeSource, setResizeSource] = useState("");
  const [resizeUrl, setResizeUrl] = useState("");
  //const [previewSource, setPreviewSource] = useState("");
  const { setImgUrl, setPreviewSource, previewSource, setShowForm } = props;

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log(file.name);
    //console.log(file);
    previewFile(file);
    uploadPhotos(e);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    //convert img to url
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // console.log(reader.result);
      setPreviewSource(reader.result);
      setShowButton(true);
      setShowForm(false);
      setUploadError("");
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    setUploadError(null);
    if (!resizeUrl) return;
    AuthAPIService.uploadImg(resizeUrl)
      .then((img) => {
        console.log(img);
        setImgUrl(img.public_id);
        setShowForm(true);
        setShowButton(false);
        setUploadError("");
      })
      .catch((res) => {
        setUploadError("Something went wrong, try again");
      });
  };

  const uploadPhotos = function (e) {
    // Read in file
    const file = e.target.files[0];

    // Ensure it's an image
    if (file.type.match(/image.*/)) {
      console.log("An image has been loaded");

      // Load the image
      const reader = new FileReader();
      reader.onload = function (readerEvent) {
        const image = new Image();
        image.onload = function (imageEvent) {
          // Resize the image
          let canvas = document.createElement("canvas"),
            max_size = 544, // TODO : pull max size from a site config
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
          const resizedImage = dataURLToBlob(dataUrl);
          console.log(resizedImage);
          setResizeSource(resizedImage);
        };
        image.src = readerEvent.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  const dataURLToBlob = function (dataURL) {
    const BASE64_MARKER = ";base64,";
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      const parts = dataURL.split(",");
      const contentType = parts[0].split(":")[1];
      const raw = parts[1];

      return new Blob([raw], { type: contentType });
    }

    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;

    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };
  /* End Utility function to convert a canvas to a BLOB      */

  return (
    <div className="App">
      <form onSubmit={handleSubmitFile}>
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          className="form-input"
        />

        <div>
          {resizeUrl && (
            <img src={resizeUrl} alt="chosen-img" style={{ height: "200px" }} />
          )}
        </div>
        {uploadError ? (
          <h3 className="error">{"Error uploading file, try smaller image"}</h3>
        ) : null}
        {showButton ? (
          <button className="form-btn" type="submit">
            Next
          </button>
        ) : null}
      </form>
    </div>
  );
}

export default Upload;
