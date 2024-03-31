import React, { useEffect } from "react";
import "./LandingPage.css";
import "../index.css";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Header from "../common/header";
import { complementaryLightBg, complementaryMainBg } from "../common/appTheme";
import puzzle_pieces from "../assests/puzzle_pieces.png";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import FaceIcon from "@mui/icons-material/Face";
import Face3Icon from "@mui/icons-material/Face3";
import Face6Icon from "@mui/icons-material/Face6";

const playtesters = [
  { name: "test1", icon: <FaceIcon color="primary" sx={{ fontSize: 100 }} /> },
  { name: "test2", icon: <Face3Icon color="primary" sx={{ fontSize: 100 }} /> },
  { name: "test3", icon: <Face6Icon color="primary" sx={{ fontSize: 100 }} /> },
  { name: "test4", icon: <Face3Icon color="primary" sx={{ fontSize: 100 }} /> },
  { name: "test5", icon: <FaceIcon color="primary" sx={{ fontSize: 100 }} /> },
  { name: "test6", icon: <Face6Icon color="primary" sx={{ fontSize: 100 }} /> },
  { name: "test7", icon: <Face6Icon color="primary" sx={{ fontSize: 100 }} /> },
];

export default function CommunityPage() {
  const headerNavLinks = [
    { name: "Games", path: "/#games" },
    { name: "Community", path: "/community" },
    { name: "Sorting helper", path: "/#sorting-helper" },
  ];
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = playtesters.length;
  const carouselStep = 3;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + carouselStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - carouselStep);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div id="community-page">
      <Header
        headerTitle="community puzzles too"
        headerNavLinks={headerNavLinks}
      />
      <div>
        <div class="c-fx-row-space-between main-area main">
          <div class="c-fx-column-start c-fx-space-between main-text">
            <h2>Follow on Patreon</h2>
            <p class="c-pb-full ">
              Follow on <b>Pareon</b> the updates aboud new feature
              announcements and the opportunity to test them out <b>first</b>.
              You can also vote for preferred features and infuence the face of
              the games.
            </p>
            <p class="c-pb-full ">
              Also, you can unlock access to more advanced features, like
              <b> saving progress</b>, changing piece shapes and many more!
            </p>

            <div class="c-pb-full">
              <Button variant="contained" href="#games">
                Join on Patreon
              </Button>
            </div>
          </div>

          <div class="c-fx-row-align-center puzzle-piece">
            <img class="logo" src={puzzle_pieces} alt="puzzle games" />
          </div>
        </div>
      </div>
      <section
        class="c-fx-column games-section"
        style={complementaryMainBg}
        id="testers"
      >
        <div>
          <h2>Playtesters</h2>
        </div>
        <div class="c-fx-space-around c-fx-row project-container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              variant="outlilned"
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          </div>

          {playtesters
            .slice(activeStep, activeStep + carouselStep)
            .map((el, index) => {
              return (
                <div
                  class="project-card"
                  style={{
                    display: "flex",
                    backgroundColor: theme.palette.primary.main,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "200px",
                      height: "200px",
                      backgroundColor: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "125px",
                    }}
                  >
                    {el.path ? <img src={el.path} /> : el.icon}
                  </div>

                  <h3>{el.name}</h3>
                  <p class="subtext">About me</p>

                  <h3>
                    <Link class="project-link">Connect</Link>
                  </h3>
                </div>
              );
            })}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep + carouselStep >= maxSteps}
              variant="outlilned"
            >
              Next
              <KeyboardArrowRight />
            </Button>
          </div>
        </div>
      </section>

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
