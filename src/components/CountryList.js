import React, { useState, useEffect } from 'react';
import '../styles/CountryList.css';
import { getPaises } from '../api/api';
import MapComponent from './MapComponent';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '600px',
  },
  overlay: {
    zIndex: 1000,
  },
};

const CountryList = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPaises()
      .then(setCountries)
      .catch(console.error);
  }, []);

  const handleShowMap = (country) => {
    setLoading(true);
    setSelectedCountry(country);
    setIsModalOpen(true);
    setLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  return (
    <div>
      <h2>Listado de Países</h2>
      <table>
        <thead>
          <tr>
            <th>País</th>
            <th>Ver mapa</th>
            <th>Provincias / Regiones</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.idPais}>
              <td>{country.nombre}</td>
              <td>
                <button onClick={() => handleShowMap(country)}>Ver mapa</button>
              </td>
              <td>
                <button onClick={() => onSelectCountry(country)}>Ver provincias</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Mapa"
        style={customStyles}
      >
        <h3>Mapa de {selectedCountry ? selectedCountry.nombre : ''}</h3>
        {loading ? <p>Cargando mapa...</p> : (
          selectedCountry && (
            <MapComponent lat={parseFloat(selectedCountry.x)} lon={parseFloat(selectedCountry.y)} />
          )
        )}
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default CountryList;
