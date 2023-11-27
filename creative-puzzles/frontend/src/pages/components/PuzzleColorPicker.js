import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { Circle, Swatch } from "@uiw/react-color";
import { red, pink } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";

const colors = (theme) => [
  [
    theme.palette.primary.main,
    theme.palette.primary.dark,
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.secondary.main,
  ],
  [red["900"], red["700"], red["500"], red["300"], red["100"]],
  [pink["900"], pink["700"], pink["500"], pink["300"], pink["100"]],
];

export default function PuzzleColorPicker(props) {
  const { onClose, open, ...other } = props;
  const theme = useTheme();

  const [color, setColor] = React.useState(theme.palette.primary.main);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(color);
  };

  const handleChange = (color) => {
    setColor(color.hex);
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
        <span style={{ color: color }}>Select piece color</span>
      </DialogTitle>
      <DialogContent dividers>
        {colors(theme).map((el) => {
          return (
            <Circle
              colors={el}
              color={color}
              onChange={(color) => {
                handleChange(color);
              }}
            />
          );
        })}
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

PuzzleColorPicker.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};
