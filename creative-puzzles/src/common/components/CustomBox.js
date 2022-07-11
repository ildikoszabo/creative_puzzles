import * as React from "react";
import { Box, ThemeProvider } from "@mui/system";
import Corner1 from "../../assests/corner1.png";
import Top1 from "../../assests/top1.png";

export default function CustomBox(props) {
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: "#007FFF",
            dark: "#0059B2",
          },
        },
      }}
    >
      {props.applyPieceMask ? (
        <Box
          sx={{
            width: 54,
            height: 54,
            border: 1,
            backgroundColor: "primary.main",
            //opacity: [props.opacity, props.opacity, props.opacity],
            "&:hover": {
              backgroundColor: "primary.dark",
              opacity: [0.9, 0.8, 0.7],
            },
            maskImage:
              props.value.topTab == 0 && props.value.leftTab == 0
                ? `url(${Corner1})`
                : `url(${Top1})`,
          }}
          onClick={props.onClick}
        >
          {props.value.topTab}
        </Box>
      ) : (
        <Box
          sx={{
            width: 54,
            height: 54,
            border: 1,
            borderColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          onClick={props.onClick}
        >
          {props.value.name}
        </Box>
      )}
    </ThemeProvider>
  );
}
