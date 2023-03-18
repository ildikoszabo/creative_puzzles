import React from 'react';
import '../index.css';
import './header.css';
import { navStyle } from './appTheme';
import DrawerMenu from './components/DrawerMenu';

export default function Header(props) {
  return (
    <div>
      <nav className="c-fx-row-space-between listMenu" style={navStyle}>
        <ul className="c-fx-row-start" id="nav-list">
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
      <nav className="c-fx-row-space-between drawerMenu" style={navStyle} id="drawer-menu">
        <div className="c-fx-align-self-center" style={{ marginLeft: '80px' }}>
          <headingtitle>{props.headerTitle}</headingtitle>
        </div>
        <div className="c-fx-align-self-center" style={{ height: '100%' }}>
          <DrawerMenu navLinks={props.headerNavLinks} />
        </div>
      </nav>
    </div>
  );
}
