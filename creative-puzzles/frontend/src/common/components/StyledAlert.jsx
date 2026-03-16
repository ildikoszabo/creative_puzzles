import React from "react";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";

export function getAlertColor(theme, alert) {
  const CUSTOM_COLORS_MAPPING = {
    success: theme.palette.alert.success,
    info: theme.palette.alert.secondary,
    error: theme.palette.alert.error,
    warning: theme.palette.alert.warning,
  };

  return CUSTOM_COLORS_MAPPING[alert.severity];
}
