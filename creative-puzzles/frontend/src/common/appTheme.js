import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    text: {
      primary: "#FFFFFF",
      secondary: "#333349",
    },
    primary: {
      light: "#B3B2FB",
      main: "#7B7AB4",
      dark: "#908FCE",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#C9E6E2",
      main: "#6A9D9B",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#333349",
    },
    // Provide every color token (light, main, dark, and contrastText) when using
    // custom colors for props in Material UI's components.
    // Then you will be able to use it like this: `<Button color="custom">`
    // (For TypeScript, you need to add module augmentation for the `custom` value)
    custom: {
      light: "#ffa726",
      main: "#f57c00",
      dark: "#ef6c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    alert: {
      success: "#8DC983",
      info: "#83B0C9",
      error: "#FF5733",
      warning: "#FB9B00",
    },
  },
  neutrals: {
    neutral_1: "#333349",
    neutral_2: "#4A4A55",
    neutral_3: "#686872",
    neutral_4: "#9F9FB1",
    neutral_5: "#DCDCED",
    neutral_6: "#FFFFFF",
  },
});

export const navStyle = {
  borderBottomColor: `${theme.palette.primary.main}`,
};

export const complementaryLightBg = {
  backgroundColor: `${theme.palette.secondary.light}`,
};

export const complementaryMainBg = {
  backgroundColor: `${theme.palette.secondary.main}`,
};

export const footerStyle = {
  backgroundColor: `${theme.neutrals.neutral_5}`,
};
