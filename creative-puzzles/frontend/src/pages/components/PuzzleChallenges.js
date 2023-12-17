import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import { generateChallenge } from "../../common/ChallengeGenerator";
import Grid from "@mui/material/Grid";

export default function PuzzleChallenges(props) {
  const [solvedChallenges, setSolvedChallenges] = React.useState([]);
  const [newChallenges, setNewChallenges] = React.useState([]);
  const { onClose, open, ...other } = props;
  const theme = useTheme();

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

  const handleOk = () => {
    onClose();
  };

  const handleChange = () => {};

  const handleClose = () => {
    onClose();
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
                {el.name}
                <Grid
                  container
                  spacing={0}
                  columns={el.width}
                  style={{ width: "50%" }}
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
                              color: block.value.includes("#") ? "white" : null,
                              border: `1px solid ${theme.palette.primary.main}`,
                            }}
                          >
                            {block.name}
                          </Grid>
                        );
                      })
                    : null}
                </Grid>
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
        <Button variant="contained" onClick={handleOk}>
          Ok
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
