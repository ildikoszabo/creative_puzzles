import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {
  Save as SaveIcon,
  Edit as EditIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  FileCopyOutlined as FileCopyIcon,
  Palette as PaletteIcon,
} from "@mui/icons-material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { styled } from "@mui/material/styles";
import PuzzleColorPicker from "./PuzzleColorPicker";

const StyledPuzzleMenu = styled(SpeedDial, {
  shouldForwardProp: (prop) => prop !== "color",
})(({ theme, color }) => ({
  position: "fixed",
  "&.MuiSpeedDial-directionDown": {
    top: theme.spacing(12),
    left: theme.spacing(125),
  },
  "& .MuiFab-primary": {
    backgroundColor: color,
    color: "white",
  },
}));

const actions = [
  { icon: <PaletteIcon />, name: "Color picker", type: "colorPicker" },
];

export default function PuzzleMenu(props) {
  const [open, setOpen] = React.useState(false);
  const [colorPickerMenuOpen, setColorPickerMenuOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleColorPickerMenuClose = (newValue) => {
    setColorPickerMenuOpen(false);

    if (newValue) {
      setCurrentColor(newValue);
      props.setCurrentColor(newValue);
    }
  };

  const handleAction = (action) => {
    if (action.type == "colorPicker") {
      setColorPickerMenuOpen(true);
    }
  };

  return (
    <div>
      <Box display="flex" sx={{ position: "absolute" }}>
        <StyledPuzzleMenu
          ariaLabel="Puzzle menu"
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={"down"}
          color={currentColor}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleAction(action)}
            />
          ))}
        </StyledPuzzleMenu>
      </Box>
      <PuzzleColorPicker
        open={colorPickerMenuOpen}
        onClose={handleColorPickerMenuClose}
        value={"Dione"}
      />
      ;
    </div>
  );
}
