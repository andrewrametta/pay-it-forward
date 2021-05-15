import React, { useState } from "react";
import AuthApiService from "../../services/auth-api-service";

function Upload(props) {
  const [uploadError, setUploadError] = useState("");
  const [showButton, setShowButton] = useState(true);
  //const [previewSource, setPreviewSource] = useState("");
  const { setImgUrl, setPreviewSource, previewSource, setShowForm } = props;

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log(file.name);
    console.log(file);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    //convert img to url
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      setPreviewSource(reader.result);
      setShowButton(true);
      setShowForm(false);
      setUploadError("");
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    fetchImgJSON(previewSource)
      //AuthApiService.uploadImg(previewSource)
      .then((img) => {
        console.log(img);
        setImgUrl(img.secure_url);
        setShowForm(true);
        setShowButton(false);
        setUploadError("");
      })
      .catch((error) => setUploadError(error));
  };

  // const uploadImg = async (base64EncodedImage) => {
  //   console.log(base64EncodedImage);
  //   try {
  //     const response = await fetch("http://localhost:8000/api/upload", {
  //       method: "POST",
  //       body: JSON.stringify({ data: (base64EncodedImage) }),
  //       headers: { "Content-type": "application/json" },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  async function fetchImgJSON(base64EncodedImage) {
    try {
      const response = await fetch("http://localhost:8800/api/uploads", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
      const itemImg = await response.json();
      return itemImg;
    } catch (error) {
      setUploadError(error);
    }
  }
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
          {previewSource && (
            <img
              src={previewSource}
              alt="chosen-img"
              style={{ height: "200px" }}
            />
          )}
        </div>
        {uploadError ? (
          <h3 className="error">{"Error uploading file, image too big"}</h3>
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
