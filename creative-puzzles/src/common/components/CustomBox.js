import * as React from "react";
import { Box, ThemeProvider } from "@mui/system";

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
      >
        {props.value.topTab}
      </Box>
    </ThemeProvider>
  );
}
