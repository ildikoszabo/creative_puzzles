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
import {
  InfinityPuzzleContext,
  InfinityPuzzleGridWidth,
} from "../../common/context/InfinityPuzzleContext";

export default function PuzzleChallenges(props) {
  const [onHoverChallenges, setOnHoverChallenges] = React.useState(null);
  const [solvedChallenges, setSolvedChallenges] = React.useState([]);
  const [newChallenges, setNewChallenges] = React.useState([]);
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
      setNewChallenges([...newChallenges, newGeneratedChallenges]);
    }
  }, []);

  const handleCancel = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const onReedemChallenge = (challengeToRedeem) => {
    let currentArrayLength = arr / InfinityPuzzleGridWidth;
    let lastMatchedPieceIndex = arr.findLastIndex(
      (piece) => piece.match == true
    );
    let currentRow = 0;
    let currentColumn = 0;
    let challengeFound = false;

    if (lastMatchedPieceIndex == -1) {
      return false;
    }

    while (!challengeFound && currentRow <= lastMatchedPieceIndex) {
      if (challengeMatch(currentColumn, currentRow, challengeToRedeem)) {
        challengeFound = true;
      }

      currentRow += (challengeToRedeem.height - 1) * InfinityPuzzleGridWidth;
    }

    //let f = arr.filter((piece) => piece.match != null);
    //console.log(f.length);
  };

  const challengeMatch = (currentColumn, currentRow, challengeToRedeem) => {
    let pattern = "";
    let patternArray = [];

    //check if all have already a challenge completed, then skip
    for (var y = currentRow; y < currentRow + challengeToRedeem.height; y++) {
      for (
        var x = currentColumn;
        x < currentColumn + challengeToRedeem.width;
        x++
      ) {
        var index = x + y * InfinityPuzzleGridWidth;
        //if the subsection contains values where there are no matched pieces yet, return false
        if (arr[index].match == false) {
          return false;
        }

        //if the subsesction already has a completed challenge, return false
        if (arr[index].challenge != "") {
          return false;
        }

        if (arr[index].bgColor == undefined) {
          return false;
        }

        patternArray.push(arr[index].bgColor);
        pattern = pattern.concat("_", arr[index].bgColor);
      }
    }

    //check if patternArray == challengeToRedeem.blocks
    console.log(pattern);
    return true;
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
                  }}
                >
                  {`${el.name} ${el.points} pts`}
                </div>
                {onHoverChallenges == index ? (
                  <div
                    className="c-fx-column-center c-fx-space-center"
                    style={{
                      color: theme.palette.text.primary,
                      border: `1px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    <Button onClick={() => onReedemChallenge(el)}>
                      Redeem challenge
                    </Button>
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