import React, { useEffect, useState } from "react";
import {
  Popper,
  Paper,
  Fade,
  Grid,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import { getRandomShapes } from "../PuzzleGenerator";
import CustomBox from "./CustomBox";

export default function PieceSelection(props) {
  const open = Boolean(props.anchorEl);
  const [arr, setArr] = useState(getRandomShapes(3, 1));

  return (
    <div
      style={{
        backgroundColor: "#6638f0",
        position: "absolute",
        top: `${props.currentMousePos.y + 25}px`,
        left: `${props.currentMousePos.x}px`,
        zIndex: 1,
      }}
    >
      <Grid container spacing={0} columns={3}>
        {arr.map((el, index) => (
          <Grid item xs={1}>
            <CustomBox value={arr[index]} opacity={1} applyPieceMask={true} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
