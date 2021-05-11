import React, { useState } from "react";

function Upload() {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [imgurl, setImgurl] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log(file.name);
    previewFile(file);
    //setFileInputState(file.name);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    //convert img to url
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    fetchImgJSON(previewSource)
      .then((img) => {
        console.log(img);
        setImgurl(img.secure_url);
      })
      .catch((error) => console.error(error));
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
    const response = await fetch("http://localhost:8080/api/uploads", {
      method: "POST",
      body: JSON.stringify({ data: base64EncodedImage }),
      headers: { "Content-type": "application/json" },
    });
    const itemImg = await response.json();
    return itemImg;
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

        <button className="form-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Upload;
