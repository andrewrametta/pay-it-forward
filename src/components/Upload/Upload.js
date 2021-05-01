import React, { useState } from "react";
import AuthApiService from "../../services/auth-api-service";

export default function Upload(props) {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [filedata, setFiledata] = useState("");
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    setFiledata(e.target.files[0].data);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    console.log(formData);
    // AuthApiService.uploadImg(formData, {
    //   name: name,
    //   img: data,
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
