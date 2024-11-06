import React from 'react';
import '../styles/Header.css';
import { Link } from "react-router-dom";

const Header = () => (
  <header className="header">
    <div className="header-content">
      <img src="/path/to/logo.png" alt="Logo" className="header-logo" />
      <h1 className="header-title">Sistema de Países</h1>
    </div>
    <nav className="header-nav">
      <ul className="header-menu">
        <li className="header-menu-item">
          <Link to="/">Inicio</Link>
        </li>
        <li className="header-menu-item">
          <Link to="/provincias">Provincias</Link>
        </li>
        <li className="header-menu-item">
          <Link to="/localidades">Localidades</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
