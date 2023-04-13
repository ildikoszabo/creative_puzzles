import React, { useEffect, useRef, useState } from "react";
import Header from "../common/header";
import Requests from "../common/helpers/requests";
import { Button, Container } from "@mui/material";
import { WebcamCapture } from "../common/components/WebcamCapture";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Typography from "@mui/material/Typography";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";

import "../index.css";
import "./PieceSearch.css";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
    //setFile(URL.createObjectURL(e.target.files[0]));

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "800px",
            height: "400px",
            justifyContent: "center",
            alignItems: "center",
            border: "solid",
          }}
        >
          {queryImage != undefined ? (
            <img
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
              }}
              class="result-image"
              src={queryImage}
            />
          ) : (
            <PhotoSizeSelectActualIcon />
          )}
        </div>
        <div
          style={{
            paddingLeft: "1em",
            display: "flex",
            width: "800px",
            height: "400px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2em",
            backgroundColor: "lightgrey",
          }}
        >
          <h3>Upload image of the puzzle (box or poster)</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleUploadClick}
              startIcon={<AttachFileIcon />}
            >
              {file ? `${file.name}` : "Select a file"}
            </Button>
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Typography>or</Typography>

            <Button variant="outlined" startIcon={<CameraAltIcon />}>
              Capture from camera
            </Button>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <Button variant="contained" onClick={() => postImage()}>
              Send
            </Button>
          </div>
        </div>
      </div>

      <div className="c-fx-column-center">
        <div>Upload a file:</div>

        <Button variant="outlined" onClick={handleUploadClick}>
          {file ? `${file.name}` : "Click to select"}
        </Button>

        <WebcamCapture />

        <Button variant="contained" onClick={() => postImage()}>
          Send
        </Button>
      </div>

      <div class="aspect-ratio--16x9">
        <div class="aspect-ratio__inner-wrapper">
          {resultImage != undefined ? (
            <img
              class="result-image"
              src={`data:image/jpeg;base64,${resultImage}`}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
