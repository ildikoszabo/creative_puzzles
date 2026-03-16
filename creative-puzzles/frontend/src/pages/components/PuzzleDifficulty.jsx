import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import { Circle, Swatch } from "@uiw/react-color";
import { red, pink } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";

const difficultySettings = [
  { type: "header", value: "easy" },
  { type: "header", value: "hard" },
  {
    type: "description",
    value: "change the color of a matched piece any time",
  },
  {
    type: "description",
    value: "the color of the matched piece cannot be changed later",
  },
];

export default function PuzzleDifficulty(props) {
  const { onClose, open, ...other } = props;
  const theme = useTheme();

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose();
  };

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
          Select difficulty level
        </span>
      </DialogTitle>
      <DialogContent dividers style={{ color: theme.palette.primary.main }}>
        <div>
          <Grid container spacing={0} columns={2}>
            {difficultySettings.map((el, index) => {
              return (
                <Grid
                  className="c-fx-column-center c-fx-space-center"
                  item
                  xs={1}
                  key={index}
                  style={{
                    backgroundColor:
                      el.type == "header" && el.value == props.difficulty
                        ? theme.palette.primary.main
                        : null,
                    color:
                      el.type == "header" && el.value == props.difficulty
                        ? theme.palette.text.primary
                        : theme.palette.primary.main,

                    border:
                      el.type == "header"
                        ? `1px solid ${theme.palette.primary.main}`
                        : null,
                    padding: el.type == "header" ? null : "4px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    el.type == "header" ? props.setDifficulty(el.value) : null
                  }
                >
                  {el.value}
                </Grid>
              );
            })}
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleOk}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PuzzleDifficulty.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};
