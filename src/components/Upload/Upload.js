import React, { useState } from "react";
import AuthApiService from "../../services/auth-api-service";

export default function Upload(props) {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("is this working?");
    console.log(e.target);
    const formData = new FormData(e.target.files);
    console.log(formData.append("file", file));
    // const formData = new FormData(e.target);
    // formData.append("pic", file);
    // console.log(file.name);
    // console.log(formData);
    // AuthApiService.uploadImg(formData, {
    //   name: filename,
    //   img: file.data,
    // })
    //   .then((img) => {
    //     props.history.push("/dashboard");
    //     console.log({ img });
    //   })
    //   .catch((res) => {
    //     console.log({ error: res.error });
    //   });
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <div className="input-container">
          <input name="pic" type="file" onChange={onChange} />
        </div>
        <input type="submit" value="Upload" className="input-submit" />
      </form>
    </div>
  );
}
