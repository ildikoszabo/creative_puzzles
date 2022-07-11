import React, { useEffect, useState } from "react";
import { Paper, Grid, Menu, MenuItem } from "@mui/material";
import { getRandomShapes } from "../PuzzleGenerator";
import CustomBox from "./CustomBox";

export default function PieceSelection(props) {
  const open = Boolean(props.anchorEl);
  const [arr, setArr] = useState(getRandomShapes(3, 1)); // TO-DO should get legit suggestion based on the selected piece value which comes from props

  return (
    <Menu
      id="basic-menu"
      anchorEl={props.anchorEl}
      open={open}
      onClose={props.handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {arr.map((el, index) => (
        <MenuItem onClick={() => props.onPieceSelection(el)}>
          <CustomBox value={el} opacity={1} applyPieceMask={true} />
        </MenuItem>
      ))}
    </Menu>
  );
}
