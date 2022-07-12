import * as React from "react";
import { Box, ThemeProvider } from "@mui/system";
import Corner1 from "../../assests/corner1.png";
import Top1 from "../../assests/top1.png";
import "./CustomBox.css";

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
            <span
              style={{ backgroundColor: "primary.main" }}
              class={`tab t${props.value.topTab}`}
            ></span>
            <span
              style={{ backgroundColor: "primary.main" }}
              class={`tab r${props.value.rightTab}`}
            ></span>
            <span
              style={{ backgroundColor: "primary.main" }}
              class={`tab b${props.value.bottomTab}`}
            ></span>
            <span
              style={{ backgroundColor: "primary.main" }}
              class={`tab l${props.value.leftTab}`}
            ></span>
          </div>
        </Box>
      ) : (
        <Box
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
            <span class={`tab t${props.value.topTab}`}></span>
            <span class={`tab r${props.value.rightTab}`}></span>
            <span class={`tab b${props.value.bottomTab}`}></span>
            <span class={`tab l${props.value.leftTab}`}></span>
          </div>
        </Box>
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
