import React from "react";
import "../index.css";
import "./header.css";
import { navStyle } from "./appTheme";

export default function Header(props) {
  return (
    <nav class="c-fx-row-space-between" style={navStyle}>
      <ul class="c-fx-row-start" id="nav-list">
        <li>
          <headingtitle>{props.headerTitle}</headingtitle>
        </li>
        {props.headerNavLinks.map((el) => (
          <li>
            <a href={el.path}>{el.name}</a>
          </li>
        ))}
      </ul>
      {props.children}
    </nav>
  );
}
