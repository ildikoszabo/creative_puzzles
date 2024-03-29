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
  Category as CategoryIcon,
} from "@mui/icons-material";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { styled } from "@mui/material/styles";
import PuzzleColorPicker from "./PuzzleColorPicker";
import PuzzleChallenges from "./PuzzleChallenges";
import PuzzleDifficulty from "./PuzzleDifficulty";

const StyledPuzzleMenu = styled(SpeedDial, {
  shouldForwardProp: (prop) => prop !== "color",
})(({ theme, color }) => ({
  position: "fixed",
  padding: "1rem",
  top: "10%",
  "& .MuiSpeedDial-directionDown": {
    top: theme.spacing(14),
    left: theme.spacing(2),
  },
  "& .MuiFab-primary": {
    backgroundColor: color,
    color: "white",
  },
}));

const actions = [
  { icon: <CategoryIcon />, name: "Difficulty", type: "difficulty" },
  { icon: <PaletteIcon />, name: "Color picker", type: "colorPicker" },
  { icon: <EmojiEventsIcon />, name: "Challenges", type: "challenges" },
];

export default function PuzzleMenu(props) {
  const [open, setOpen] = React.useState(false);
  const [colorPickerMenuOpen, setColorPickerMenuOpen] = React.useState(false);
  const [challengeMenuOpen, setChallengeMenuOpen] = React.useState(false);
  const [difficultyMenuOpen, setDifficultyMenuOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(!open);

  const handleMenuClose = (newValue, type) => {
    if (type == "colorPicker") {
      setColorPickerMenuOpen(false);

      if (newValue) {
        setCurrentColor(newValue);
        props.setCurrentColor(newValue);
      }
    }

    if (type == "challenges") {
      setChallengeMenuOpen(false);
    }

    if (type == "difficulty") {
      setDifficultyMenuOpen(false);
    }
  };

  const handleAction = (action) => {
    if (action.type == "colorPicker") {
      setColorPickerMenuOpen(true);
    }

    if (action.type == "challenges") {
      setChallengeMenuOpen(true);
    }

    if (action.type == "difficulty") {
      setDifficultyMenuOpen(true);
    }
  };

  return (
    <div>
      <Box display="flex" sx={{ position: "absolute" }}>
        <StyledPuzzleMenu
          ariaLabel="Puzzle menu"
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          //onClose={handleClose}
          //onOpen={handleOpen}
          open={open}
          direction={"down"}
          color={currentColor}
          onClick={handleClick}
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
        onClose={(val) => handleMenuClose(val, "colorPicker")}
      />
      <PuzzleChallenges
        addToScore={props.addToScore}
        open={challengeMenuOpen}
        onClose={(val) => handleMenuClose(val, "challenges")}
      />
      <PuzzleDifficulty
        difficulty={props.difficulty}
        setDifficulty={props.setDifficulty}
        open={difficultyMenuOpen}
        onClose={(val) => handleMenuClose(val, "difficulty")}
      />
    </div>
  );
}
