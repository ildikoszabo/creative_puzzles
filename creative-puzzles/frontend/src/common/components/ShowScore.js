import React from "react";
import { useTheme } from "@mui/material/styles";
import { useStickyHeader } from "../hooks";

const lightOnColorStyle = (theme) => ({
  width: "100px",
  backgroundColor: `${theme.palette.primary.main}`,
  color: "white",
});

const colorOnLightStyle = (theme) => ({
  width: "100px",
  backgroundColor: "white",
  color: `${theme.palette.primary.main}`,
});

export default function ShowScore(props) {
  const theme = useTheme();

  const sticky = useStickyHeader();
  const onUpdateStyle = props.shouldScroll
    ? sticky
      ? lightOnColorStyle(theme)
      : colorOnLightStyle(theme)
    : lightOnColorStyle(theme);
  const deafultStyle = props.shouldScroll
    ? sticky
      ? colorOnLightStyle(theme)
      : lightOnColorStyle(theme)
    : colorOnLightStyle(theme);

  return (
    <>
      {props.showUpdateScore != null ? (
        <div
          className="c-fx-column-center c-fx-space-center"
          style={onUpdateStyle}
        >
          <span> {props.showUpdateScore} pts</span>
        </div>
      ) : (
        <div
          className="c-fx-column-center c-fx-space-center"
          style={deafultStyle}
        >
          <span> {props.score} pts</span>
        </div>
      )}
    </>
  );
}
