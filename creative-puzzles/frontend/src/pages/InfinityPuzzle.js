import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
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
import ShowScore from "../common/components/ShowScore";
import {
  InfinityPuzzleContext,
  InfinityPuzzleGridWidth,
  updatePuzzlePieceInList,
} from "../common/context/InfinityPuzzleContext";
import { getAlertColor } from "../common/components/StyledAlert";

const headerNavLinks = [
  { name: "Games", path: "/#games" },
  { name: "Community", path: "/community" },
  { name: "Sorting helper", path: "/#sorting-helper" },
];

export default function InfinityPuzzle() {
  const [arr, setArr] = useState(
    getRandomShapes(InfinityPuzzleGridWidth, 40).slice(
      0,
      -InfinityPuzzleGridWidth
    )
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [ancholElIndex, setAnchorElIndex] = useState(null);
  const [selectedGeneratedPiece, setSelectedGeneratedPiece] = useState(null);
  const [currentlyHoveredPiece, setCurrentlyHoveredPiece] = useState(null);
  const [alert, setAlert] = useState({ isOpen: false });
  const [currentColor, setCurrentColor] = useState(null);
  const theme = useTheme();
  const [score, setScore] = useState(0);
  const [showUpdateScore, setShowUpdateScore] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentlyHoveredPiece(9);
  }, []);

  useEffect(() => {
    setShowUpdateScore(null);
  }, [score]);

  const getColor = (pieceColor) => {
    return pieceColor != undefined && pieceColor != null
      ? pieceColor
      : `${theme.palette.primary.main}`;
  };

  const onPieceSelection = (pieceDetails, event, color) => {
    if (selectedGeneratedPiece.name === pieceDetails.name) {
      let newColor = getColor(color);
      selectedGeneratedPiece.bgColor = newColor;
      if (selectedGeneratedPiece.match == false) {
        addToScore(1);
        selectedGeneratedPiece.match = true;
      }

      setCurrentColor(newColor);
      setArr(updatePuzzlePieceInList(arr, selectedGeneratedPiece));
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
    var lastRow = arr.slice(-InfinityPuzzleGridWidth);

    const nextValues = getRandomShapes(
      InfinityPuzzleGridWidth,
      40,
      lastRow
    ).slice(0, -InfinityPuzzleGridWidth);
    let newArr = arr.concat(nextValues);
    setArr([...newArr]);
  };

  const addToScore = (newValue, message = "") => {
    setShowUpdateScore(`+ ${newValue}`);
    showAlertSnackbar(`${message}  + ${newValue} pts `, "success");
    const timeoutId = setTimeout(() => {
      setScore(score + newValue);
    }, 1000);
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
    <div
      onClick={() => {
        return alert.isOpen ? hideAlertSnackbar() : () => {};
      }}
    >
      <InfinityPuzzleContext.Provider
        value={{
          arr,
          setArr,
        }}
      >
        <Header
          headerTitle="infinity puzzle"
          headerNavLinks={headerNavLinks}
          shouldScroll={true}
        >
          <ShowScore
            showUpdateScore={showUpdateScore}
            score={score}
            shouldScroll={true}
          />
        </Header>

        <div className="c-fx-row-center" style={{ backgroundColor: "white" }}>
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
                  <Grid container spacing={0} columns={InfinityPuzzleGridWidth}>
                    {arr.map((el, index) => (
                      <Grid
                        item
                        xs={1}
                        key={index}
                        aria-controls={anchorEl ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorEl ? "true" : undefined}
                        onClick={(event) =>
                          difficulty == "easy" && el.challenge == ""
                            ? handleClick(event, el, index)
                            : difficulty != "easy" &&
                              el.match == false &&
                              el.challenge == ""
                            ? handleClick(event, el, index)
                            : null
                        }
                        id="basic-button"
                      >
                        <CustomBox
                          value={arr[index]}
                          id={index}
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
              addToScore={addToScore}
              setCurrentColor={(value) => {
                setCurrentColor(value);
              }}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
            />
          </div>
        </div>

        <Snackbar
          open={alert.isOpen}
          autoHideDuration={4000}
          onClose={() => {
            hideAlertSnackbar();
          }}
          sx={{ marginTop: "20%" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert
            onClose={() => {
              hideAlertSnackbar();
            }}
            variant="filled"
            severity={alert.severity}
            sx={{ width: "100%", background: getAlertColor(theme, alert) }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </InfinityPuzzleContext.Provider>
    </div>
  );
}
