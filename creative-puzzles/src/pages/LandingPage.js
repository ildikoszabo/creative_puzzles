import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import "./LandingPage.css";
import "../index.css";
import puzzle_pieces from "../assests/puzzle_pieces.png";
import patreon from "../assests/Digital-Patreon-Logo_Black.png";
import game_picture from "../assests/game_picture.PNG";
import gallery from "../assests/Gallery.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import Header from "../common/header";
import {
  complementaryLightBg,
  complementaryMainBg,
  footerStyle,
} from "../common/appTheme";

const headerNavLinks = [
  { name: "Games", path: "#games" },
  { name: "Community", path: "#community" },
  { name: "About me", path: "#about-me" },
];

export default function LandingPage() {
  return (
    <div>
      <section className="main">
        <Header headerTitle="puzzle games" headerNavLinks={headerNavLinks}>
          <div className="puzzle-piece">
            <img
              className="rotate90 logo"
              src={puzzle_pieces}
              alt="puzzle games"
            />
          </div>

          <div className="c-fx-row-start">
            <Button href="#login" disableElevation>
              Log in
            </Button>
            <Button variant="contained" href="#games" disableElevation>
              Play
            </Button>
          </div>
        </Header>
        <div className="c-fx-row-space-between main-area">
          <div className="c-fx-column-start c-fx-space-between main-text">
            <h1>Puzzling simplified</h1>
            <p className="c-pb-full ">
              An online platform designed to play and to engage with the
              community — all in one place
            </p>

            <div className="c-pb-full">
              <Button variant="contained" href="#games">
                Try a game
              </Button>
            </div>
          </div>
          <div className="main-right">
            <img src={puzzle_pieces} alt="puzzle games" />
          </div>
        </div>

        <section
          className="c-fx-row-space-between socials"
          style={complementaryLightBg}
        >
          <div className="c-fx-column-center c-fx-space-between">
            <IconButton component="label">
              <YouTubeIcon fontSize="large" />
            </IconButton>
            <span>Watch more puzzle related content</span>
          </div>
          <div className="c-fx-column-center c-fx-space-between">
            <IconButton component="label">
              <img src={patreon} alt="patreon" className="socials-icon-size" />
            </IconButton>
            <span>Join the Patreon community</span>
          </div>
          <div className="c-fx-column-center c-fx-space-between">
            <IconButton component="label">
              <InstagramIcon fontSize="large" />
            </IconButton>
            <span>
              For daily and behind the scene content follow on Instagram
            </span>
          </div>
          <div className="c-fx-column-center c-fx-space-between">
            <IconButton component="label">
              <GitHubIcon fontSize="large" />
            </IconButton>
            <span>
              To find out more about how these games work check out GitHub
            </span>
          </div>
        </section>
      </section>
      <section
        className="c-fx-column games-section"
        style={complementaryMainBg}
        id="games"
      >
        <div>
          <h2>Try one of these games now</h2>
        </div>
        <div className="c-fx-space-around c-fx-row project-container">
          <div className="project-card">
            <img
              className="project-image"
              src={game_picture}
              alt="Infinity puzzle"
            />
            <h3>Infinity puzzle</h3>
            <p className="subtext">Infinit scrolling puzzle game</p>
            <hr />
            <h3>
              <Link className="project-link" to={`games/infinityPuzzle`}>
                Play now
              </Link>
            </h3>
          </div>
          <div className="project-card">
            <img
              className="project-image"
              src={game_picture}
              alt="Puzzle tetris"
            />
            <h3>Puzzle tetris</h3>
            <p className="subtext">classNameic tetris with a puzzle twist</p>
            <hr />
            <h3>
              <a className="project-link" href="">
                Play now
              </a>
            </h3>
          </div>
        </div>
      </section>
      <section id="community" className="c-fx-column community-section">
        <div className="c-fx-row-space-between">
          <div>
            <img
              className="rotateminus90"
              src={puzzle_pieces}
              alt="puzzle games"
            />
          </div>
          <div className="community-main-text">
            <p>
              Join the Patreon community to read free articles about how these
              games were built and unlock access to livestreams.
            </p>
          </div>
        </div>
        <div className="community-main-button">
          <Button variant="outlined" href="#games">
            Join Patreon
          </Button>
        </div>
      </section>
      <section className="games-again-section">
        <div className="c-fx-column c-fx-space-center c-padding-full">
          <p>Something with a puzzle image and related to the games</p>
          <div>
            <Button variant="contained" href="#games">
              Play now
            </Button>
          </div>
        </div>
      </section>

      <section id="about-me" className="c-fx-row-space-between">
        <div className="c-fx-row">
          <img src={gallery} alt="personal projects" />
        </div>

        <div className="c-fx-column">
          <div className="c-fx-row about-me-icon">
            <img src={puzzle_pieces} alt="puzzle games" />
          </div>
          <div className="c-fx-column-start c-fx-space-between about-me-text ">
            <h2>About</h2>
            <p>
              All the design and implementation done by one passionate
              individual.
            </p>
            <p className="c-pb-full">Meet me.</p>
            <div>
              <Button variant="outlined" href="#games">
                Visit personal webpage
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="contact-me"
        style={complementaryMainBg}
        className="c-fx-row contact-me"
      >
        <div className="c-fx-column-start c-fx-space-between contact-me-text">
          <h2>Do you have some feedback? Let’s talk!</h2>
          <div className="c-pb-full">
            <Button variant="contained" href="#games">
              Join a livestream
            </Button>
          </div>
        </div>
        <div className="c-fx-column-center contact-me-email">
          <h2>hello@puzzlegame.com</h2>
        </div>
      </section>

      <footer className="c-fx-row-space-between" style={footerStyle}>
        <div className="c-fx-column">
          <p>Enjoy free to play puzzle games online.</p>
          <h2>Puzzle games</h2>
        </div>
        <div className="c-fx-column footer-item">
          <span>
            Puzzle games is an online website which offers free to play games
          </span>
          <span style={{ fontWeight: "bold" }}>© Puzzle games 2022</span>
        </div>
        <div className="c-fx-column footer-item-bold">
          <span>
            <a href="#games">Games</a>
          </span>
          <span>
            <a href="#community">Community</a>
          </span>
          <span>
            <a href="#about-me">About me</a>
          </span>
        </div>
        <div className="c-fx-column footer-item-bold">
          <span>1 000 123 4566</span>
          <span>hello@puzzlegame.com</span>
        </div>
        <div className="c-fx-column footer-item">
          <span>
            <a href="#community">Terms of Use</a>
          </span>
          <span>
            <a href="#community">Privacy policy</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
