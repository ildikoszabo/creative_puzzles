import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import "./LandingPage.css";
import puzzle_pieces from "../assests/puzzle_pieces.png";
import patreon from "../assests/Digital-Patreon-Logo_Black.png";
import game_picture from "../assests/game_picture.PNG";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function LandingPage() {
  return (
    <div>
      <section class="main">
        <nav>
          <ul id="nav-list">
            <li>
              <headingtitle>puzzle games</headingtitle>
            </li>
            <li>
              <a href="#games">Games</a>
            </li>
            <li>
              <a href="#community">Community</a>
            </li>
            <li>
              <a href="#about-me">About me</a>
            </li>
          </ul>
          <div class="puzzle-piece">
            <img class="rotate90 logo" src={puzzle_pieces} alt="puzzle games" />
          </div>

          <div class="nav-right">
            <Button href="#login" disableElevation>
              Log in
            </Button>
            <Button variant="contained" href="#games" disableElevation>
              Play
            </Button>
          </div>
        </nav>
        <div class="main-area">
          <div class="main-text">
            <h1>Puzzling simplified</h1>
            <p class="c-pb-full ">
              An online platform designed to play and to engage with the
              community — all in one place
            </p>

            <div class="c-pb-full">
              <Button variant="contained" href="#games">
                Try a game
              </Button>
            </div>
          </div>
          <div class="main-right">
            <img src={puzzle_pieces} alt="puzzle games" />
          </div>
        </div>

        <section class="socials">
          <div class="socials-item">
            <IconButton component="label">
              <YouTubeIcon fontSize="large" />
            </IconButton>
            <span>Watch more puzzle related content</span>
          </div>
          <div class="socials-item">
            <IconButton component="label">
              <img src={patreon} alt="patreon" class="socials-icon-size" />
            </IconButton>
            <span>Join the Patreon community</span>
          </div>
          <div class="socials-item">
            <IconButton component="label">
              <InstagramIcon fontSize="large" />
            </IconButton>
            <span>
              For daily and behind the scene content follow on Instagram
            </span>
          </div>
          <div class="socials-item">
            <IconButton component="label">
              <GitHubIcon fontSize="large" />
            </IconButton>
            <span>
              To find out more about how these games work check out GitHub
            </span>
          </div>
        </section>
      </section>
      <section class="games-section" id="games">
        <div>
          <h2>Try one of these games now</h2>
        </div>
        <div class="project-container">
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
              <a class="project-link" href="">
                Play now
              </a>
            </h3>
          </div>
          <div class="project-card">
            <img class="project-image" src={game_picture} alt="Puzzle tetris" />
            <h3>Puzzle tetris</h3>
            <p class="subtext">Classic tetris with a puzzle twist</p>
            <hr />
            <h3>
              <a class="project-link" href="">
                Play now
              </a>
            </h3>
          </div>
        </div>
      </section>
      <section id="community" class="community-section">
        <div class="community-main">
          <div>
            <img class="rotateminus90" src={puzzle_pieces} alt="puzzle games" />
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
      <footer id="contact-me">
        <h2>Contact me</h2>
      </footer>
    </div>
  );
}
