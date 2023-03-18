import { useEffect, useState } from "react";
import { Box, ThemeProvider } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import "./CustomBox.css";

const inStyle = (theme) => ({
  backgroundColor: `${theme.neutrals.neutral_6}`,
});

const hoverStyle = (theme) => ({
  backgroundColor: `${theme.palette.primary.dark}`,
});

const nonHoverStyle = (theme) => ({
  backgroundColor: `${theme.palette.primary.main}`,
});

export default function CustomBox(props) {
  const theme = useTheme();
  const [isBoxHovered, setIsBoxHovered] = useState(false);

  useEffect(() => {
    if (props.fromPieceSelection != undefined) {
      if (
        props.currentlyHoveredPiece != undefined &&
        props.id == props.currentlyHoveredPiece
      ) {
        setIsBoxHovered(true);
      } else {
        setIsBoxHovered(false);
      }
    }
    console.log("custombox useffect 1");
  }, []);

  const getEdgeStyle = (edge) => {
    if (edge === -1) {
      return inStyle(theme);
    } else if (isBoxHovered) {
      return hoverStyle(theme);
    } else {
      return nonHoverStyle(theme);
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

    console.log("tabstyle");
  }, [isBoxHovered]);

  const setBoxHoverState = () => {
    let newState = !isBoxHovered;
    setIsBoxHovered(newState);
    if (newState === true && props.fromPieceSelection === false) {
      props.setCurrentlyHoveredPiece(props.id);
    }
  };

  const setMainStyle = (props) => {
    var style = {
      width: 54,
      height: 54,
      border: props.needsHighlight ? 1 : 0,
      borderColor: "primary.main",
      backgroundColor:
        props.clicked || props.id === props.currentlyHoveredPiece
          ? "primary.dark"
          : "white",
      margin: 0,
      boxSizing: "border-box",
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
            margin: 0,
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
          onMouseEnter={() => setBoxHoverState()}
          onMouseLeave={() => setBoxHoverState()}
          sx={setMainStyle(props)}
          onClick={props.onClick}
        ></Box>
      )}
    </ThemeProvider>
  );
}
