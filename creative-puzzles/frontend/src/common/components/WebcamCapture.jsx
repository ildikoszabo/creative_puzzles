import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 800,
  height: 400,
  facingMode: "environment", //user
};

export const WebcamCapture = (props) => {
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("webcam ref" + imageSrc);

    return imageSrc;
  }, [webcamRef]);

  /*useEffect(() => {
    if (props.trigger != 0) {
      const imageSrc = capture();
      console.log("webcam" + imageSrc);
      //props.getScreenShot(imageSrc);
    }
  }, [props.trigger]);*/

  return (
    <>
      <Webcam
        audio={false}
        height={400}
        ref={props.webcamRef}
        screenshotFormat="image/jpeg"
        width={800}
        videoConstraints={videoConstraints}
      />
    </>
  );
};
