import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import CustomBox from "../common/components/CustomBox";
import { getRandomShapes } from "../common/PuzzleGenerator";
import PieceSelection from "../common/components/PieceSelection";

export default function InfinityPuzzle() {
  const [progress, setProgress] = useState(0);
  const [arr, setArr] = useState(getRandomShapes(8, 40));

  useEffect(() => {
    let computeProgress = () => {
      // The scrollTop gives length of window that has been scrolled
      const scrolled = document.documentElement.scrollTop;
      // scrollHeight gives total length of the window and
      // The clientHeight gives the length of viewport
      const scrollLength =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = `${(100 * scrolled) / scrollLength}`;

      if (progress > 60) {
        // add more values to the list
        let nextValues = getRandomShapes(8, 40);
        let newArr = arr.concat(nextValues);
        setArr(newArr);
      }

      setProgress(progress);
    };

    // Adding event listener on mounting
    window.addEventListener("scroll", computeProgress);

    // Removing event listener upon unmounting
    return () => window.removeEventListener("scroll", computeProgress);
  });

  const [isPieceSelectionVisible, setIsPieceSelectionVisible] =
    React.useState(false);

  const [currentMousePos, setCurrentMousePos] = React.useState({ x: 0, y: 0 });

  const handlePopoverOpen = (event) => {
    setIsPieceSelectionVisible(true);
    let PosX, PosY;

    if (event.pageX || event.pageY) {
      PosX = event.pageX;
      PosY = event.pageY;
    } /*else if (event.clientX || event.clientY) {
      PosX =
        event.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      PosY =
        event.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }*/
    console.log(PosX);
    setCurrentMousePos({ x: PosX, y: PosY });
  };

  const handlePopoverClose = () => {
    setIsPieceSelectionVisible(false);
  };

  const onPieceSelection = (pieceDetails) => {
    alert("selectedPice " + pieceDetails.rightTab);
  };

  return (
    <div>
      {isPieceSelectionVisible ? (
        <PieceSelection
          handlePopoverClose={handlePopoverClose}
          currentMousePos={currentMousePos}
          onPieceSelection={onPieceSelection}
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
                  onMouseEnter={handlePopoverOpen}
                  //onMouseLeave={handlePopoverClose}
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
    </div>
  );
}
