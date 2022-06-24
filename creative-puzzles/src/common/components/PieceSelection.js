import React, { useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { getRandomShapes } from "../PuzzleGenerator";
import CustomBox from "./CustomBox";

export default function PieceSelection(props) {
  const open = Boolean(props.anchorEl);
  const [arr, setArr] = useState(getRandomShapes(3, 1));

  return (
    <div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={props.anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={props.handlePopoverClose}
        disableRestoreFocus
      >
        <Grid container spacing={0} columns={3}>
          {arr.map((el, index) => (
            <Grid item xs={1}>
              <CustomBox value={arr[index]} opacity={1} applyPieceMask={true} />
            </Grid>
          ))}
        </Grid>
      </Popover>
    </div>
  );
}
