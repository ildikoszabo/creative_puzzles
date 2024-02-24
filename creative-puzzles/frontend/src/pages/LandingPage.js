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
  { name: "Sorting helper", path: "#sorting-helper" },
];

export default function LandingPage() {
  return (
    <div>
      <div>
        <section>
          <Header headerTitle="i puzzle too" headerNavLinks={headerNavLinks}>
            <div class="puzzle-piece">
              <img
                class="rotate90 logo"
                src={puzzle_pieces}
                alt="puzzle games"
              />
            </div>

            <div class="c-fx-row-start">
              <Button href="comingSoon" disableElevation>
                Log in
              </Button>
              <Button variant="contained" href="#games" disableElevation>
                Play
              </Button>
            </div>
          </Header>
          <div class="c-fx-row-space-between main-area main">
            <div class="c-fx-column-start c-fx-space-between main-text">
              <h1>Hello Puzzler!</h1>
              <p class="c-pb-full ">
                Welcome to an online platform designed to play and to engage
                with the community — all in one place
              </p>

              <div class="c-pb-full">
                <Button variant="contained" href="#games">
                  Try a game
                </Button>
              </div>
            </div>
            <div class="c-fx-row-align-center puzzle-piece">
              <img class="logo" src={puzzle_pieces} alt="puzzle games" />
            </div>
          </div>
        </section>
        <section class="socials" style={complementaryLightBg}>
          <div class="c-fx-column-center">
            <IconButton component="label">
              <YouTubeIcon fontSize="large" />
            </IconButton>
            <span class="socials-text">Watch more puzzle related content</span>
          </div>
          <div class="c-fx-column-center">
            <IconButton component="label">
              <img src={patreon} alt="patreon" class="socials-icon-size" />
            </IconButton>
            <span class="socials-text">Join the Patreon community</span>
          </div>
          <div class="c-fx-column-center">
            <IconButton component="label">
              <InstagramIcon fontSize="large" />
            </IconButton>
            <span class="socials-text">
              For daily and behind the scene content follow on Instagram
            </span>
          </div>
        </section>
      </div>
      <section
        class="c-fx-column games-section"
        style={complementaryMainBg}
        id="games"
      >
        <div>
          <h2>Try one of these games now</h2>
        </div>
        <div class="c-fx-space-around c-fx-row project-container">
          <div class="project-card">
            <img
              class="project-image"
              src={game_picture}
              alt="Infinity puzzle"
            />
            <h3>Infinity puzzle</h3>
            <p class="subtext">Infinit scrolling puzzle game</p>
            <hr />
            <h3>
              <Link class="project-link" to={`games/infinityPuzzle`}>
                Play now
              </Link>
            </h3>
          </div>
          <div class="project-card">
            <img class="project-image" src={game_picture} alt="Puzzle tetris" />
            <h3>Puzzle tetris</h3>
            <p class="subtext">Classic tetris with a puzzle twist</p>
            <hr />
            <h3>
              <Link class="project-link" to={`comingSoon`}>
                Play now
              </Link>
            </h3>
          </div>
        </div>
      </section>
      <section id="community" class="c-fx-column community-section">
        <div class="c-fx-row-space-between">
          <div>
            <img
              class="rotateminus90 community-puzzle-piece"
              src={puzzle_pieces}
              alt="puzzle games"
            />
          </div>
          <div className="community-main-text">
            <p>
              Join the Patreon community to unlock access to more advanced
              features, like saving progress, changing color on individual
              pieces and many more!
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <div className="c-fx-column c-fx-space-center c-padding-full">
            <p>Upload an image of the puzzle you need help with</p>
            <div>
              <Button variant="contained" href="comingSoon">
                Search
              </Button>
            </div>
          </div>
          <div>
            <img
              class="rotate90 community-puzzle-piece"
              src={puzzle_pieces}
              alt="puzzle games"
            />
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
          <div class="c-pb-full">
            <Button variant="contained" href="#games">
              Coonect on Patreon
            </Button>
          </div>
        </div>
        <div className="c-fx-column-center contact-me-email">
          <h2>ipuzzletoo@gmail.com</h2>
        </div>
      </section>

      <footer style={complementaryLightBg}>
        <div className="c-fx-column">
          <p>Enjoy free to play puzzle games online.</p>
          <h2>i puzzle too</h2>
        </div>
        <div className="c-fx-column footer-item">
          <span>
            <i>i puzzle too</i> is an online website which offers free to play
            games
          </span>
          <span style={{ fontWeight: "bold" }}>© i puzzle too 2023</span>
        </div>
        <div className="c-fx-column footer-item-bold">
          <span>
            <a href="#games">Games</a>
          </span>
          <span>
            <a href="#community">Community</a>
          </span>
        </div>
        <div className="c-fx-column footer-item-bold">
          <span>ipuzzletoo@gmail.com</span>
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
