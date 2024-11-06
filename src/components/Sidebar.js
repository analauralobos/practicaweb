import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ onSelectCountry, onSelectProvince }) => {
  return (
    <div className="sidebar">
      <h2>Menú</h2>
      <ul>
        <li><Link to="/" onClick={() => { onSelectCountry(null); onSelectProvince(null); }}>Inicio</Link></li>
        <li><Link to="/paises" onClick={() => onSelectCountry(null)}>Países</Link></li>
        <li><Link to="/provincias" onClick={() => onSelectProvince(null)}>Provincias</Link></li>
        <li><Link to="/localidades">Localidades</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

