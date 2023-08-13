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
  const [showAlert, setShowAlert] = useState(false);
  const [mousePosition, setMousePosition] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentlyHoveredPiece(9);
  }, []);

  const onPieceSelection = (pieceDetails, event) => {
    if (selectedGeneratedPiece.name === pieceDetails.name) {
      selectedGeneratedPiece.match = true;
    } else {
      setShowAlert(true);
    }

    setAnchorEl(null);
    const { previousSibling, value } = event.target;

    //console.log(event);
    event.preventDefault();
    //value.focus();
    //const position = value.length;
    if (mousePosition != null) {
      console.log("setting to " + mousePosition);
      event.clientX = mousePosition.x;
      event.clientY = mousePosition.y;
    }
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

  const needHighlight = (gridIndex) => {
    if (currentlyHoveredPiece != null) {
      let columnLength = 8;
      let surroundArray = [currentlyHoveredPiece + columnLength];

      if ((currentlyHoveredPiece + 1) % columnLength !== 0) {
        surroundArray.push(currentlyHoveredPiece + 1);
        surroundArray.push(currentlyHoveredPiece + columnLength + 1);
        surroundArray.push(currentlyHoveredPiece - columnLength + 1);
      }

      if (currentlyHoveredPiece % columnLength !== 0) {
        surroundArray.push(currentlyHoveredPiece - 1);
        surroundArray.push(currentlyHoveredPiece + columnLength - 1);
        surroundArray.push(currentlyHoveredPiece - columnLength - 1);
      }

      if (currentlyHoveredPiece > columnLength - 1) {
        surroundArray.push(currentlyHoveredPiece - columnLength);
      }

      return surroundArray.includes(gridIndex);
    }
    return false;
  };

  const setCurrentMousePosition = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
    console.log(mousePosition);
  };
  return (
    <div>
      <Header headerTitle="infinity puzzle" headerNavLinks={headerNavLinks} />

      <div className="c-fx-column-center">
        <InfinityScroll threshold={60} loadNewValues={loadNewValues}>
          {anchorEl ? (
            <PieceSelection
              onPieceSelection={onPieceSelection}
              handleClick={handleClick}
              handleClose={handleClose}
              anchorEl={anchorEl}
              selectedGeneratedPiece={selectedGeneratedPiece}
            />
          ) : null}

          <Container
            className="c-fx-row-center middle-box"
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
                      onMouseEnter={setCurrentMousePosition}
                    >
                      <CustomBox
                        value={arr[index]}
                        id={index}
                        opacity={0}
                        applyPieceMask={el.match}
                        clicked={anchorEl != null && ancholElIndex === index}
                        currentlyHoveredPiece={currentlyHoveredPiece}
                        setCurrentlyHoveredPiece={setCurrentlyHoveredPiece}
                        needsHighlight={needHighlight(index)}
                        fromPieceSelection={false}
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
      </div>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => {
          setShowAlert(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setShowAlert(false);
          }}
          variant="outlined"
          severity="warning"
          sx={{ width: "100%" }}
        >
          Not a match. Try again!
        </Alert>
      </Snackbar>
    </div>
  );
}
