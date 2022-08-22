import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import CustomBox from "../common/components/CustomBox";
import { getRandomShapes } from "../common/PuzzleGenerator";
import PieceSelection from "../common/components/PieceSelection";
import InfinityScroll from "../common/components/InfinityScroll";

export default function InfinityPuzzle() {
  const [arr, setArr] = useState(getRandomShapes(8, 40).slice(0, -8));
  const [anchorEl, setAnchorEl] = useState(null);
  const [ancholElIndex, setAnchorElIndex] = useState(null);
  const [selectedGeneratedPiece, setSelectedGeneratedPiece] = useState(null);

  const onPieceSelection = (pieceDetails) => {
    if (selectedGeneratedPiece.name === pieceDetails.name) {
      selectedGeneratedPiece.match = true;
    }
    //else not a match snack bar

    setAnchorEl(null);
  };

  const handleClick = (event, el, elIndex) => {
    setAnchorEl(event.currentTarget);
    setAnchorElIndex(elIndex);
    setSelectedGeneratedPiece(el);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElIndex(null);
  };

  const loadNewValues = () => {
    var width = 8;
    var lastRow = arr.slice(-width);

    const nextValues = getRandomShapes(8, 40, lastRow).slice(0, -8);
    let newArr = arr.concat(nextValues);
    setArr(newArr);
  };

  return (
    <div>
      <InfinityScroll threshold={60} loadNewValues={loadNewValues}>
        {anchorEl ? (
          <PieceSelection
            onPieceSelection={onPieceSelection}
            handleClick={handleClick}
            handleClose={handleClose}
            anchorEl={anchorEl}
            selectedGeneratedPiece={selectedGeneratedPiece}
          />
        ) : null}

        <Container
          fluid="false"
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
                    key={index}
                    aria-controls={anchorEl ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={anchorEl ? "true" : undefined}
                    onClick={(event) => handleClick(event, el, index)}
                    id="basic-button"
                  >
                    <CustomBox
                      value={arr[index]}
                      opacity={0}
                      applyPieceMask={el.match}
                      clicked={anchorEl != null && ancholElIndex == index}
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
