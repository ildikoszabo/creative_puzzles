import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import CustomBox from "../common/components/CustomBox";
import { getRandomShapes } from "../common/PuzzleGenerator";

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

  return (
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
              <Grid item xs={1}>
                <CustomBox value={arr[index]} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        "Loading"
      )}
    </Container>
  );
}
