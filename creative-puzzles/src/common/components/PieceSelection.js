import React, { useEffect, useState } from "react";
import { Paper, Grid, Menu, MenuItem } from "@mui/material";
import {
  getRandomShapes,
  getRandomTabValue,
  getPieceName,
} from "../PuzzleGenerator";
import CustomBox from "./CustomBox";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const generatePieceSuggestions = (correctPiece) => {
  let pieceSuggestions = new Array();

  for (let i = 0; i < 3; i++) {
    var shape = Object.assign({}, correctPiece);

    if (shape.topTab != 0) shape.topTab = getRandomTabValue();
    if (shape.rightTab != 0) shape.rightTab = getRandomTabValue();
    if (shape.bottomTab != 0) shape.bottomTab = getRandomTabValue();
    if (shape.leftTab != 0) shape.leftTab = getRandomTabValue();
    shape.name = getPieceName(shape);
    pieceSuggestions.push(shape);
  }

  pieceSuggestions.push(correctPiece);
  shuffleArray(pieceSuggestions);
  return pieceSuggestions;
};

export default function PieceSelection(props) {
  const open = Boolean(props.anchorEl);
  const [arr, setArr] = useState(
    generatePieceSuggestions(props.selectedGeneratedPiece)
  );

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
        <MenuItem
          style={index == 0 ? { marginBottom: "20px" } : { marginTop: "20px" }}
          onClick={() => props.onPieceSelection(el)}
        >
          <CustomBox value={el} opacity={1} applyPieceMask={true} />
        </MenuItem>
      ))}
    </Menu>
  );
}
