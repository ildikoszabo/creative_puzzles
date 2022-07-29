import * as React from "react";
import { Box, ThemeProvider, createTheme } from "@mui/system";
import Corner1 from "../../assests/corner1.png";
import Top1 from "../../assests/top1.png";
import "./CustomBox.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007FFF",
      dark: "#0059B2",
    },
  },
});

const outStyle = {
  backgroundColor: `${theme.palette.primary.main}`,
  "&:hover": {
    backgroundColor: `${theme.palette.primary.dark}`,
  },
};

const inStyle = {
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: `${theme.palette.primary.dark}`,
  },
};

export default function CustomBox(props) {
  return (
    <ThemeProvider theme={theme}>
      {props.applyPieceMask ? (
        <Box
          sx={{
            fontSize: "9px", //controls the size and ration of the inner elements which have sizes in "em"
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            mixBlendMode: "darken",
          }}
        >
          <div class="pieceBase">
            <span
              style={props.value.rightTab != -1 ? outStyle : inStyle}
              class={`tab t${props.value.topTab}`}
            ></span>
            <span
              style={props.value.rightTab != -1 ? outStyle : inStyle}
              class={`tab r${props.value.rightTab}`}
            ></span>
            <span
              style={props.value.rightTab != -1 ? outStyle : inStyle}
              class={`tab b${props.value.bottomTab}`}
            ></span>
            <span
              style={props.value.rightTab != -1 ? outStyle : inStyle}
              class={`tab l${props.value.leftTab}`}
            ></span>
          </div>
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
        ></Box>
      )}
    </ThemeProvider>
  );
}

/*        <Box
          sx={{
            fontSize: "9px",
            border: 1,
            backgroundColor: "primary.main",
            //opacity: [props.opacity, props.opacity, props.opacity],
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          <div class="pieceBase">
            <span class="tabShape t"></span>
            <span class="tabShape r"></span>
            <span class="tabShape b"></span>
            <span class="tabShape l"></span>
          </div>
        </Box> */

/*        <div class="pieceBase">
          <span class="tab t1"}></span>
          <span class="tab r-1"></span>
          <span class="tab b1"></span>
          <span class="tab l1"></span>
        </div> */
