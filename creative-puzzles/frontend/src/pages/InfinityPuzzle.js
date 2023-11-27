import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import CustomBox from "../common/components/CustomBox";
import { getRandomShapes } from "../common/PuzzleGenerator";
import PieceSelection from "../common/components/PieceSelection";
import InfinityScroll from "../common/components/InfinityScroll";
import Header from "../common/header";
import "../index.css";
import { useTheme } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import PuzzleMenu from "./components/PuzzleMenu";

const headerNavLinks = [
  { name: "Games", path: "/#games" },
  { name: "Community", path: "/#community" },
  { name: "Sorting helper", path: "/#sorting-helper" },
];

export default function InfinityPuzzle() {
  const [arr, setArr] = useState(getRandomShapes(8, 40).slice(0, -8));
  const [anchorEl, setAnchorEl] = useState(null);
  const [ancholElIndex, setAnchorElIndex] = useState(null);
  const [selectedGeneratedPiece, setSelectedGeneratedPiece] = useState(null);
  const [currentlyHoveredPiece, setCurrentlyHoveredPiece] = useState(null);
  const [alert, setAlert] = useState(false);
  const [currentColor, setCurrentColor] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentlyHoveredPiece(9);
  }, []);

  const onPieceSelection = (pieceDetails, event, color) => {
    setCurrentColor(color);
    pieceDetails = Object.assign(pieceDetails, { bgColor: color });
    console.log("color after selection" + color);
    if (selectedGeneratedPiece.name === pieceDetails.name) {
      selectedGeneratedPiece.match = true;
      showAlertSnackbar("It's a match. Yay!", "success");
    } else {
      showAlertSnackbar("Not a match. Try again!", "warning");
    }

    setAnchorEl(null);
  };

  const handleClick = (event, el, elIndex) => {
    setAnchorEl(event.currentTarget);
    setAnchorElIndex(elIndex);
    setSelectedGeneratedPiece(el);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElIndex(null);
  };

  const loadNewValues = () => {
    var width = 8;
    var lastRow = arr.slice(-width);

    const nextValues = getRandomShapes(8, 40, lastRow).slice(0, -8);
    let newArr = arr.concat(nextValues);
    setArr(newArr);
  };

  const showAlertSnackbar = (message, severity) => {
    let newAlert = {
      isOpen: true,
      message: message,
      severity: severity,
    };
    setAlert(newAlert);
  };

  const hideAlertSnackbar = () => {
    let newAlert = {
      isOpen: false,
      message: alert.message,
      severity: alert.severity,
    };
    setAlert(newAlert);
  };
  return (
    <div>
      <Header headerTitle="infinity puzzle" headerNavLinks={headerNavLinks} />

      <div className="c-fx-row-center">
        <InfinityScroll threshold={60} loadNewValues={loadNewValues}>
          {anchorEl ? (
            <PieceSelection
              onPieceSelection={onPieceSelection}
              handleClick={handleClick}
              handleClose={handleClose}
              anchorEl={anchorEl}
              selectedGeneratedPiece={selectedGeneratedPiece}
              currentColor={currentColor}
            />
          ) : null}

          <Container
            className="c-fx middle-box"
            fluid="false"
            disableGutters={true}
            maxWidth="xs"
            style={{ color: theme.palette.primary.main }}
          >
            {arr !== undefined ? (
              <Box>
                <Grid container spacing={0} columns={8}>
                  {arr.map((el, index) => (
                    <Grid
                      item
                      xs={1}
                      key={index}
                      aria-controls={anchorEl ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={anchorEl ? "true" : undefined}
                      onClick={(event) => handleClick(event, el, index)}
                      id="basic-button"
                    >
                      <CustomBox
                        value={arr[index]}
                        id={index}
                        opacity={0}
                        applyPieceMask={el.match}
                        clicked={selectedGeneratedPiece === el}
                        isHovered={
                          currentlyHoveredPiece != undefined &&
                          index == currentlyHoveredPiece
                        }
                        currentlyHoveredPiece={currentlyHoveredPiece}
                        setCurrentlyHoveredPiece={setCurrentlyHoveredPiece}
                        fromPieceSelection={false}
                        currentColor={currentColor}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              "Loading"
            )}
          </Container>
        </InfinityScroll>
        <div className="c-fx-row">
          <PuzzleMenu
            setCurrentColor={(value) => {
              setCurrentColor(value);
            }}
          />
        </div>
      </div>

      <Snackbar
        open={alert.isOpen}
        autoHideDuration={6000}
        onClose={() => {
          hideAlertSnackbar();
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            hideAlertSnackbar();
          }}
          variant="outlined"
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
