import React, { useLayoutEffect, useState, useRef } from "react";
import "../index.css";
import "./header.css";
import { navStyle } from "./appTheme";
import DrawerMenu from "./components/DrawerMenu";
import { useStickyHeader } from "./hooks";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const lightOnColorStyle = (theme) => ({
  backgroundColor: `${theme.palette.primary.main}`,
  color: "white",
  li: {
    color: "white",
  },
});

const colorOnLightStyle = (theme) => ({
  backgroundColor: "white",
  color: `${theme.palette.primary.main}`,
});

export default function Header(props) {
  const theme = useTheme();
  const ref = useRef();
  const sticky = useStickyHeader();
  const headerClasses = props.shouldScroll ? `${sticky ? "sticky" : ""}` : "";
  const headerStyle = props.shouldScroll
    ? sticky
      ? lightOnColorStyle(theme)
      : colorOnLightStyle(theme)
    : colorOnLightStyle(theme);

  return (
    <div ref={ref} className={headerClasses} style={headerStyle}>
      <nav className="c-fx-row-space-between listMenu" style={navStyle}>
        <ul className="c-fx-row-start" id="nav-list">
          <li>
            <headingtitle>{props.headerTitle}</headingtitle>
          </li>
          {props.headerNavLinks.map((el) => (
            <li>
              <Link
                class="project-link"
                to={el.path}
                style={{ color: "inherit" }}
              >
                {el.name}
              </Link>
            </li>
          ))}
        </ul>
        {props.children}
      </nav>

      <nav
        className="c-fx-row-space-between drawerMenu"
        style={navStyle}
        id="drawer-menu"
      >
        <div className="c-fx-align-self-center" style={{ marginLeft: "80px" }}>
          <headingtitle>{props.headerTitle}</headingtitle>
        </div>
        {props.children}
        {props.headerNavLinks != undefined &&
        props.headerNavLinks.length != 0 ? (
          <div className="c-fx-align-self-center" style={{ height: "100%" }}>
            <DrawerMenu navLinks={props.headerNavLinks} />
          </div>
        ) : null}
      </nav>
    </div>
  );
}
