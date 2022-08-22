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

  const setMainStyle = (props) => {
    var style = {
      width: 54,
      height: 54,
      border: 1,
      borderColor: "primary.main",
      backgroundColor: props.clicked ? "primary.dark" : "white",
      "&:hover": {
        backgroundColor: "primary.dark",
      },
    };

    return style;
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
        <Box sx={setMainStyle(props)} onClick={props.onClick}></Box>
      )}
    </ThemeProvider>
  );
}
