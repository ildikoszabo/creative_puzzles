import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import { generateChallenge } from "../../common/ChallengeGenerator";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  InfinityPuzzleContext,
  InfinityPuzzleGridWidth,
  updatePuzzlePieceInList,
} from "../../common/context/InfinityPuzzleContext";

const errorMessage =
  "The selected challenge was not found.\nMake sure that each piece marked with a different letter has a different color.\nColored pieces need to be the same color as in the challenge.";

const instructions =
  "Complete the pattern anywhere on the board.\nA-Z can be any color of your choosing.\nAfter completing the pattern on the board, select Redeem to get the points!";

export default function PuzzleChallenges(props) {
  const [onHoverChallenges, setOnHoverChallenges] = React.useState(null);
  const [solvedChallenges, setSolvedChallenges] = React.useState([]);
  const [newChallenges, setNewChallenges] = React.useState([]);
  const [showErrorMessage, setShowErrorMessage] = React.useState(null);
  const { onClose, open, ...other } = props;
  const theme = useTheme();
  const { arr, setArr } = useContext(InfinityPuzzleContext);

  useEffect(() => {
    let newGeneratedChallenges = generateChallenge(
      solvedChallenges,
      newChallenges,
      theme
    );

    if (newChallenges.length == 0) {
      setNewChallenges(newGeneratedChallenges);
    } else {
      setNewChallenges([...newChallenges, ...newGeneratedChallenges]);
    }
  }, [solvedChallenges]);

  const handleCancel = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const onReedemChallenge = (challengeToRedeem) => {
    let lastMatchedPieceIndex = arr.findLastIndex(
      (piece) => piece.match == true
    );
    let currentRow = 0;
    let currentColumn = 0;
    let challengeFound = false;

    if (lastMatchedPieceIndex == -1) {
      setShowErrorMessage(challengeToRedeem.name);
      return false;
    }

    while (!challengeFound && currentRow <= lastMatchedPieceIndex) {
      if (challengeMatch(currentColumn, currentRow, challengeToRedeem)) {
        challengeFound = true;
      }

      if (currentColumn + 1 < InfinityPuzzleGridWidth) {
        currentColumn += 1;
      } else {
        currentColumn = 0;
        currentRow += InfinityPuzzleGridWidth;
      }
    }
  };

  const challengeMatch = (currentColumn, currentRow, challengeToRedeem) => {
    let pattern = "";
    let patternArray = [];
    let patternFilteredArray = [];
    let challengeFilteredArray = [];
    let challengeFiltered = "";
    let challengeRow = 0;
    let challengeIndex = 0;

    //check if all have already a challenge completed, then skip
    for (var y = currentRow; y < currentRow + challengeToRedeem.height; y++) {
      for (
        var x = currentColumn;
        x < currentColumn + challengeToRedeem.width;
        x++
      ) {
        var index = x + y + challengeRow * (InfinityPuzzleGridWidth - 1);
        let currentValue = arr[index];
        let replaceValue =
          challengeToRedeem.challengeBlocks[challengeIndex].value;
        //if the subsection contains values where there are no matched pieces yet, return false
        //if the subsesction already has a completed challenge, return false
        //if challenge needs specific color check if it is at the expected position
        if (
          currentValue.match == false ||
          currentValue.challenge != "" ||
          currentValue.bgColor == undefined ||
          (replaceValue.includes("#") &&
            currentValue.bgColor.toLowerCase() != replaceValue.toLowerCase())
        ) {
          setShowErrorMessage(challengeToRedeem.name);
          return false;
        }

        if (!replaceValue.includes("#")) {
          patternArray.push(currentValue);
          pattern = pattern.concat("_", currentValue.bgColor);
          challengeFiltered = challengeFiltered.concat("_", replaceValue);
          challengeFilteredArray.push(replaceValue);
        }

        patternFilteredArray.push(currentValue);
        challengeIndex++;
      }
      challengeRow += 1;
    }

    for (var i = 0; i < patternArray.length; i++) {
      let currentValue = patternArray[i].bgColor;
      let replaceValue = challengeFilteredArray[i];
      pattern = pattern.replaceAll(currentValue, replaceValue);
    }

    if (pattern.toLowerCase() == challengeFiltered.toLowerCase()) {
      let newValues = arr;
      patternFilteredArray.forEach((el) => {
        el.challenge = challengeToRedeem.name;
        newValues = updatePuzzlePieceInList(newValues, el);
        return el;
      });
      setArr(newValues);
      setNewChallenges(
        newChallenges.filter(
          (challenge) => challenge.name !== challengeToRedeem.name
        )
      );
      setSolvedChallenges([...solvedChallenges, challengeToRedeem]);

      props.addToScore(challengeToRedeem.points, "Challenge completed!");
      handleCancel();
      return true;
    }

    setShowErrorMessage(challengeToRedeem.name);
    return false;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
    >
      <DialogTitle>
        <span style={{ color: theme.palette.primary.main }}>
          Select a challenge
        </span>
      </DialogTitle>
      <DialogContent dividers style={{ color: theme.palette.primary.main }}>
        <div>
          <div
            className="c-fx-column-center c-fx-space-center"
            style={{
              color: theme.palette.primary.main,
              marginBottom: "20px",
            }}
          >
            <Box sx={{ whiteSpace: "pre-wrap" }}>{instructions}</Box>
          </div>
          {newChallenges.map((el, index) => {
            return (
              <div>
                <div
                  className="c-fx-column-center c-fx-space-center"
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.primary,
                  }}
                  onMouseEnter={() => {
                    setOnHoverChallenges(null);
                    setShowErrorMessage(null);
                  }}
                >
                  {`${el.name} ${el.points} pts`}
                </div>

                {onHoverChallenges == index ? (
                  <div
                    className="c-fx-column-center c-fx-space-center"
                    style={{
                      color: theme.palette.primary.main,
                      border: `1px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    {showErrorMessage === el.name ? (
                      <Box sx={{ whiteSpace: "pre-wrap" }}>{errorMessage}</Box>
                    ) : (
                      <Button onClick={() => onReedemChallenge(el)}>
                        Redeem challenge
                      </Button>
                    )}
                  </div>
                ) : (
                  <Grid
                    container
                    spacing={0}
                    columns={el.width}
                    //style={{ width: "50%" }}
                    onMouseEnter={() => {
                      setOnHoverChallenges(index);
                    }}
                    onMouseLeave={() => {
                      setOnHoverChallenges(null);
                      setShowErrorMessage(null);
                    }}
                  >
                    {el.challengeBlocks != undefined
                      ? el.challengeBlocks.map((block, index) => {
                          return (
                            <Grid
                              className="c-fx-column-center c-fx-space-center"
                              item
                              xs={1}
                              key={index}
                              id="challenge-cell"
                              style={{
                                backgroundColor: block.value.includes("#")
                                  ? block.value
                                  : null,
                                color: block.value.includes("#")
                                  ? "white"
                                  : null,
                                border: `1px solid ${theme.palette.primary.main}`,
                              }}
                            >
                              {block.name.includes("#") ? "" : block.name}
                            </Grid>
                          );
                        })
                      : null}
                  </Grid>
                )}
                <br />
              </div>
            );
          })}
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PuzzleChallenges.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};
