import { useLayoutEffect, useState } from "react";
import { Box, ThemeProvider } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import "./CustomBox.css";

const inStyle = (theme) => ({
  backgroundColor: `${theme.neutrals.neutral_6}`,
});

const hoverStyle = (theme, pieceColor, challenge) => ({
  backgroundColor: pieceColor ? pieceColor : `${theme.palette.primary.dark}`,
});

const nonHoverStyle = (theme, pieceColor, challenge) => ({
  backgroundColor:
    pieceColor != undefined && pieceColor != null
      ? pieceColor
      : `${theme.palette.primary.main}`,
});

export default function CustomBox(props) {
  const theme = useTheme();
  const [isBoxHovered, setIsBoxHovered] = useState(props.isHovered);

  let pieceColor = props.fromPieceSelection
    ? props.currentColor
    : props.value.bgColor;

  const getEdgeStyle = (edge, challenge) => {
    if (edge === -1) {
      return inStyle(theme);
    } else if (isBoxHovered) {
      return hoverStyle(theme, pieceColor, challenge);
    } else {
      return nonHoverStyle(theme, pieceColor, challenge);
    }
  };

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
            backgroundColor: pieceColor ? pieceColor : "primary.main",
            "&:hover": {
              backgroundColor: pieceColor ? pieceColor : "primary.dark",
            },
            mixBlendMode: "darken",
            margin: 0,
            //filter: `brightness(${props.opacity})`,
          }}
        >
          <div className="pieceBase">
            <div
              className="pieceBackgroundImage"
              style={{
                backgroundImage:
                  props.value.challenge == ""
                    ? null
                    : `repeating-linear-gradient(-45deg, ${pieceColor},  ${pieceColor} 15px, white 15px, white 20px)`,
              }}
            >
              <span
                style={getEdgeStyle(props.value.topTab, props.value.challenge)}
                className={`tab t${props.value.topTab}`}
              ></span>
              <span
                style={getEdgeStyle(
                  props.value.rightTab,
                  props.value.challenge
                )}
                className={`tab r${props.value.rightTab}`}
              ></span>
              <span
                style={getEdgeStyle(
                  props.value.bottomTab,
                  props.value.challenge
                )}
                className={`tab b${props.value.bottomTab}`}
              ></span>
              <span
                style={getEdgeStyle(props.value.leftTab, props.value.challenge)}
                className={`tab l${props.value.leftTab}`}
              ></span>
            </div>
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
