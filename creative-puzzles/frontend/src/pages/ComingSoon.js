import React, { useEffect, useState } from "react";

import "../index.css";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Header from "../common/header";
import {
  complementaryLightBg,
  complementaryMainBg,
  footerStyle,
  navStyle,
} from "../common/appTheme";

export default function ComingSoon() {
  const headerNavLinks = [
    { name: "Games", path: "/#games" },
    { name: "Community", path: "/#community" },
    { name: "Sorting helper", path: "/#sorting-helper" },
  ];

  return (
    <div id="error-page">
      <Header headerTitle="coming soon" headerNavLinks={headerNavLinks} />

      <div className="c-fx-column-center c-padding-full">
        <Stack spacing={1}>
          <Skeleton
            sx={{ bgcolor: complementaryLightBg }}
            animation="wave"
            variant="rounded"
            width={210}
            height={30}
          />
          <p>Coming soon</p>
          <Skeleton
            sx={{ bgcolor: complementaryLightBg }}
            animation="wave"
            variant="rounded"
            width={210}
            height={30}
          />
        </Stack>
      </div>
    </div>
  );
}
