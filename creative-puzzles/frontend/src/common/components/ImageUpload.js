import React, { useRef, useState } from "react";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { WebcamCapture } from "./WebcamCapture";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Typography from "@mui/material/Typography";
import { Button, Container } from "@mui/material";

export function ImageUpload(props) {
  const webcamRef = useRef(null);
  const inputRef = useRef(null);

  const [file, setFile] = useState();
  const [isUploadFromCamera, setIsUploadFromCamera] = useState(false);

  const handleUploadClick = () => {
    setIsUploadFromCamera(false);
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
      props.setQueryImage(reader.result);
    };
  };

  const getScreenShot = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  }, [webcamRef]);

  return (
    <div>
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
          {props.queryImage != undefined ? (
            <img
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
              }}
              class="result-image"
              src={props.queryImage}
            />
          ) : isUploadFromCamera ? (
            <WebcamCapture
              getScreenShot={getScreenShot}
              webcamRef={webcamRef}
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
          <h3>
            {props.step == 1
              ? "Upload image of the puzzle (box or poster)"
              : "Upload image of the puzzle piece"}
          </h3>
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

            {isUploadFromCamera == false ? (
              <Button
                variant="outlined"
                startIcon={<CameraAltIcon />}
                onClick={() => {
                  setIsUploadFromCamera(true);
                }}
              >
                Capture from camera
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<CameraAltIcon />}
                onClick={() => props.setQueryImage(getScreenShot())}
              >
                Save screenshot
              </Button>
            )}
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              onClick={() =>
                props.step == 1
                  ? (props.setStep(props.step + 1),
                    setIsUploadFromCamera(false),
                    setFile(null))
                  : props.postImage()
              }
            >
              {props.step == 1 ? "Next" : "Search"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
