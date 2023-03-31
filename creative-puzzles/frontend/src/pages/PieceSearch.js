import React, { ChangeEvent, useRef, useState } from "react";
import Header from "../common/header";
import Requests from "../common/helpers/requests";
import { Button } from "@mui/material";
import "../index.css";

const headerNavLinks = [
  { name: "Games", path: "/#games" },
  { name: "Community", path: "/#community" },
  { name: "Sorting helper", path: "/#sorting-helper" },
];

export default function PieceSearch() {
  const [file, setFile] = useState();
  const [queryImage, setQueryImage] = useState();
  const [resultImage, setResultImage] = useState();
  const inputRef = useRef(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setQueryImage(reader.result);
    };
  };

  const postImage = () => {
    let url = "http://localhost:7071/api/SubPieceSearch";
    let body = JSON.stringify({ name: "name", img: queryImage });
    //let body = JSON.stringify(queryImage); works also

    Requests.post(url, {}, body).then((res) => {
      if (res.body != undefined) {
        setResultImage(res.body);
      }
    });
  };

  return (
    <div>
      <Header headerTitle="infinity puzzle" headerNavLinks={headerNavLinks} />

      <div className="c-fx-column-center">
        <div>Upload a file:</div>

        <button onClick={handleUploadClick}>
          {file ? `${file.name}` : "Click to select"}
        </button>

        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <Button variant="contained" href="#games" onClick={() => postImage()}>
          Send
        </Button>

        <img src={`data:image/jpeg;base64,${resultImage}`} />
      </div>
    </div>
  );
}
