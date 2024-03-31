import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import Header from "../common/header";
import Requests from "../common/helpers/requests";
import { ImageUpload } from "../common/components/ImageUpload";
import "../index.css";
import "./PieceSearch.css";

const headerNavLinks = [
  { name: "Games", path: "/#games" },
  { name: "Community", path: "/community" },
  { name: "Sorting helper", path: "/#sorting-helper" },
];

export default function PieceSearch() {
  const [step, setStep] = useState(1);
  const [puzzleImage, setPuzzleImage] = useState();
  const [pieceImage, setPieceImage] = useState();
  const [resultImage, setResultImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const postImage = () => {
    setIsLoading(true);
    let url = "";
    let body = JSON.stringify({
      name: "images",
      puzzleImage: puzzleImage,
      pieceImage: pieceImage,
    });
    //let body = JSON.stringify(queryImage); works also

    Requests.post(url, {}, body)
      .then((res) => {
        if (res.body != undefined) {
          setResultImage(res.body);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
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
        {step == 1 ? (
          <ImageUpload
            step={step}
            setStep={setStep}
            queryImage={puzzleImage}
            setQueryImage={setPuzzleImage}
            postImage={postImage}
          />
        ) : (
          <ImageUpload
            step={step}
            setStep={setStep}
            queryImage={pieceImage}
            setQueryImage={setPieceImage}
            postImage={postImage}
          />
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "start",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "800px",
            height: "800px",
            justifyContent: "center",
            alignItems: "center",
            border: "solid",
          }}
        >
          {resultImage != undefined ? (
            <div class="aspect-ratio--16x9">
              <div class="aspect-ratio__inner-wrapper">
                <img
                  class="result-image"
                  src={`data:image/jpeg;base64,${resultImage}`}
                />
              </div>
            </div>
          ) : isLoading ? (
            <CircularProgress />
          ) : (
            <PhotoSizeSelectActualIcon />
          )}
        </div>
      </div>
    </div>
  );
}
