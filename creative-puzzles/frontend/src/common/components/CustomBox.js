import { useEffect, useState } from "react";
import { Box, ThemeProvider } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import "./CustomBox.css";

const inStyle = (theme) => ({
  backgroundColor: `${theme.neutrals.neutral_6}`,
});

const hoverStyle = (theme, selectedColor, setColor) => ({
  backgroundColor: setColor ? setColor : `${theme.palette.primary.dark}`,
});

const nonHoverStyle = (theme, selectedColor, setColor) => ({
  backgroundColor:
    setColor != undefined && setColor != null
      ? setColor
      : `${theme.palette.primary.main}`,
});

export default function CustomBox(props) {
  const theme = useTheme();
  const [isBoxHovered, setIsBoxHovered] = useState(props.isHovered);

  const getEdgeStyle = (edge) => {
    if (edge === -1) {
      return inStyle(theme);
    } else if (isBoxHovered) {
      return hoverStyle(theme, props.currentColor, props.value.bgColor);
    } else {
      return nonHoverStyle(theme, props.currentColor, props.value.bgColor);
    }
  };

  const setBoxHoverState = () => {
    let newState = !isBoxHovered;
    setIsBoxHovered(newState);
    if (newState === true && props.fromPieceSelection === false) {
      props.setCurrentlyHoveredPiece(props.id);
      console.log("color on hover" + props.currentColor);
    }
  };

  const setMainStyle = (props) => {
    var style = {
      width: 54,
      height: 54,
      border: needsHighlight() ? 1 : 0,
      borderColor: "primary.main",
      backgroundColor: props.clicked ? "primary.dark" : "white",
      margin: 0,
      boxSizing: "border-box",
    };

    return style;
  };

  const needsHighlight = () => {
    let gridIndex = props.id;
    if (props.currentlyHoveredPiece != null) {
      let columnLength = 8;
      let surroundArray = [props.currentlyHoveredPiece + columnLength];
      surroundArray.push(props.currentlyHoveredPiece);

      if ((props.currentlyHoveredPiece + 1) % columnLength !== 0) {
        surroundArray.push(props.currentlyHoveredPiece + 1);
        surroundArray.push(props.currentlyHoveredPiece + columnLength + 1);
        surroundArray.push(props.currentlyHoveredPiece - columnLength + 1);
      }

      if (props.currentlyHoveredPiece % columnLength !== 0) {
        surroundArray.push(props.currentlyHoveredPiece - 1);
        surroundArray.push(props.currentlyHoveredPiece + columnLength - 1);
        surroundArray.push(props.currentlyHoveredPiece - columnLength - 1);
      }

      if (props.currentlyHoveredPiece > columnLength - 1) {
        surroundArray.push(props.currentlyHoveredPiece - columnLength);
      }

      return surroundArray.includes(gridIndex);
    }
    return false;
  };

  return (
    <ThemeProvider theme={theme}>
      {props.applyPieceMask ? (
        <Box
          onMouseEnter={() => setBoxHoverState()}
          onMouseLeave={() => setBoxHoverState()}
          sx={{
            fontSize: "9px", //controls the size and ration of the inner elements which have sizes in "em"
            backgroundColor: props.value.bgColor
              ? props.value.bgColor
              : "primary.main",
            "&:hover": {
              backgroundColor: props.value.bgColor
                ? props.value.bgColor
                : "primary.dark",
            },
            mixBlendMode: "darken",
            margin: 0,
          }}
        >
          <div className="pieceBase">
            <span
              style={getEdgeStyle(props.value.topTab)}
              className={`tab t${props.value.topTab}`}
            ></span>
            <span
              style={getEdgeStyle(props.value.rightTab)}
              className={`tab r${props.value.rightTab}`}
            ></span>
            <span
              style={getEdgeStyle(props.value.bottomTab)}
              className={`tab b${props.value.bottomTab}`}
            ></span>
            <span
              style={getEdgeStyle(props.value.leftTab)}
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
