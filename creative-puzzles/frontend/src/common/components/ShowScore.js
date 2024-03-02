import React from "react";
import { useTheme } from "@mui/material/styles";

export default function ShowScore(props) {
  const theme = useTheme();
  return (
    <>
      {props.showUpdateScore != null ? (
        <div
          className="c-fx-column-center c-fx-space-center"
          style={{
            width: "100px",
            backgroundColor: "white",
            color: theme.palette.primary.main,
          }}
        >
          <span> {props.showUpdateScore} pts</span>
        </div>
      ) : (
        <div
          className="c-fx-column-center c-fx-space-center"
          style={{
            width: "100px",
            backgroundColor: theme.palette.primary.main,
            color: "white",
          }}
        >
          <span> {props.score} pts</span>
        </div>
      )}
    </>
  );
}
