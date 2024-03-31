import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import InfinityPuzzle from "./pages/InfinityPuzzle";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";
import PieceSearch from "./pages/PieceSearch";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { theme } from "./common/appTheme";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import ComingSoon from "./pages/ComingSoon";
import CommunityPage from "./pages/CommunityPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "games/infinityPuzzle",
    element: <InfinityPuzzle />,
    errorElement: <ErrorPage />,
  },
  {
    path: "utils/pieceSearch",
    element: <PieceSearch />,
    errorElement: <ErrorPage />,
  },
  {
    path: "comingSoon",
    element: <ComingSoon />,
    errorElement: <ErrorPage />,
  },
  {
    path: "community",
    element: <CommunityPage />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
