import React, { useEffect, useState } from "react";
import { Paper, Grid } from "@mui/material";
import { getRandomShapes } from "../PuzzleGenerator";
import CustomBox from "./CustomBox";

export default function CustomPieceSelection(props) {
  const open = Boolean(props.anchorEl);
  const [arr, setArr] = useState(getRandomShapes(3, 1)); // TO-DO should get legit suggestion based on the selected piece value which comes from props

  return (
    <div
      style={{
        backgroundColor: "#6638f0",
        position: "absolute",
        top: `${props.currentMousePos.y + 15}px`,
        left: `${props.currentMousePos.x}px`,
        zIndex: 1,
      }}
    >
      <Paper
        variant="outlined"
        elevation="12"
        sx={{ padding: "10px", border: "solid" }}
      >
        <Grid container spacing={0} columns={3}>
          {arr.map((el, index) => (
            <Grid item xs={1} onClick={() => props.onPieceSelection(el)}>
              <CustomBox value={el} opacity={1} applyPieceMask={true} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}
