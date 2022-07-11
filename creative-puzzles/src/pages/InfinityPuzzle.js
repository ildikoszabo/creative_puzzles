import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import CustomBox from "../common/components/CustomBox";
import { getRandomShapes } from "../common/PuzzleGenerator";
import PieceSelection from "../common/components/PieceSelection";
import InfinityScroll from "../common/components/InfinityScroll";

export default function InfinityPuzzle() {
  const [arr, setArr] = useState(getRandomShapes(8, 40));
  const [anchorEl, setAnchorEl] = useState(null);

  const onPieceSelection = (pieceDetails) => {
    alert("selectedPice " + pieceDetails.rightTab);

    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const loadNewValues = () => {
    const nextValues = getRandomShapes(8, 40);
    let newArr = arr.concat(nextValues);
    setArr(newArr);
  };

  return (
    <div>
      <InfinityScroll treshold={60} loadNewValues={loadNewValues}>
        {anchorEl ? (
          <PieceSelection
            onPieceSelection={onPieceSelection}
            handleClick={handleClick}
            handleClose={handleClose}
            anchorEl={anchorEl}
          />
        ) : null}

        <Container
          fluid={false}
          disableGutters={true}
          maxWidth="xs"
          style={{
            height: "100%",
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {arr !== undefined ? (
            <Box xs={{}}>
              <Grid container spacing={0} columns={8}>
                {arr.map((el, index) => (
                  <Grid
                    item
                    xs={1}
                    aria-controls={anchorEl ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={anchorEl ? "true" : undefined}
                    onClick={handleClick}
                    id="basic-button"
                  >
                    <CustomBox
                      value={arr[index]}
                      opacity={0}
                      applyPieceMask={false}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            "Loading"
          )}
        </Container>
      </InfinityScroll>
    </div>
  );
}
