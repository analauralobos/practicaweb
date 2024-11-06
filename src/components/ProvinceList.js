import React, { useState, useEffect } from 'react';
import '../styles/ProvinceList.css';
import { getProvincias } from '../api/api';
import MapComponent from './MapComponent';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProvinceList = ({ country, onSelectProvince }) => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProvincias(country.idPais).then(setProvinces).catch(console.error);
  }, [country]);

  const handleShowMap = (province) => {
    setSelectedProvince(province);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProvince(null);
  };

  return (
    <div>
      <h2>Provincias de {country.nombre}</h2>
      <table>
        <thead>
          <tr>
            <th>Provincia</th>
            <th>Ver mapa</th>
            <th>Localidades</th>
          </tr>
        </thead>
        <tbody>
          {provinces.map((province) => (
            <tr key={province.idProvincia}>
              <td>{province.nombre}</td>
              <td>
                <button onClick={() => handleShowMap(province)}>Ver mapa</button>
              </td>
              <td>
                <button onClick={() => onSelectProvince(province)}>Ver localidades</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Mapa" style={{ overlay: { zIndex: 1000 } }}>
        <h3>Mapa de {selectedProvince ? selectedProvince.nombre : ''}</h3>
        {selectedProvince && (
          <MapComponent lat={parseFloat(selectedProvince.x)} lon={parseFloat(selectedProvince.y)} />
        )}
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default ProvinceList;
