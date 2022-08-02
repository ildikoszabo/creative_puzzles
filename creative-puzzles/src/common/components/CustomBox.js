import { useEffect, useState } from "react";
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
};

const inStyle = {
  backgroundColor: "white",
};

const hoverStyle = {
  backgroundColor: `${theme.palette.primary.dark}`,
};

const nonHoverStyle = {
  backgroundColor: `${theme.palette.primary.main}`,
};

export default function CustomBox(props) {
  const [isBoxHovered, setIsBoxHovered] = useState(false);

  const getEdgeStyle = (edge) => {
    if (edge == -1) {
      return inStyle;
    } else if (isBoxHovered) {
      return hoverStyle;
    } else {
      return nonHoverStyle;
    }
  };

  let tabStyle = {
    topTab: getEdgeStyle(props.value.topTab),
    leftTab: getEdgeStyle(props.value.leftTab),
    bottomTab: getEdgeStyle(props.value.bottomTab),
    rightTab: getEdgeStyle(props.value.rightTab),
  };

  const [boxEdgeStyle, setBoxEdgeStyle] = useState(tabStyle);

  useEffect(() => {
    tabStyle.topTab = getEdgeStyle(props.value.topTab);
    tabStyle.rightTab = getEdgeStyle(props.value.rightTab);
    tabStyle.bottomTab = getEdgeStyle(props.value.bottomTab);
    tabStyle.leftTab = getEdgeStyle(props.value.leftTab);

    setBoxEdgeStyle(tabStyle);
  }, [isBoxHovered]);

  const setBoxHoverState = () => {
    setIsBoxHovered(!isBoxHovered);
  };

  return (
    <ThemeProvider theme={theme}>
      {props.applyPieceMask ? (
        <Box
          onMouseEnter={() => setBoxHoverState()}
          onMouseLeave={() => setBoxHoverState()}
          sx={{
            fontSize: "9px", //controls the size and ration of the inner elements which have sizes in "em"
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            mixBlendMode: "darken",
          }}
        >
          <div className="pieceBase">
            <span
              style={boxEdgeStyle.topTab}
              className={`tab t${props.value.topTab}`}
            ></span>
            <span
              style={boxEdgeStyle.rightTab}
              className={`tab r${props.value.rightTab}`}
            ></span>
            <span
              style={boxEdgeStyle.bottomTab}
              className={`tab b${props.value.bottomTab}`}
            ></span>
            <span
              style={boxEdgeStyle.leftTab}
              className={`tab l${props.value.leftTab}`}
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
