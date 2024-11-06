import React, { useState, useEffect } from 'react';
import '../styles/LocalityList.css';
import { getLocalidades, guardarRecorrido } from '../api/api';
import MapComponent from './MapComponent'; 
import Modal from 'react-modal';

Modal.setAppElement('#root');

// Coordenadas de General Pico
const LAT_GPI = -35.6670417786;
const LON_GPI = -63.759071350;

const calculateDistance = (lat2, lon2) => {
  const lat1 = LAT_GPI * Math.PI / 180;
  const lon1 = LON_GPI * Math.PI / 180;
  const lat2Rad = lat2 * Math.PI / 180;
  const lon2Rad = lon2 * Math.PI / 180;

  const D = 6378.137 * Math.acos(
    Math.cos(lat1) * Math.cos(lat2Rad) * Math.cos(lon2Rad - lon1) +
    Math.sin(lat1) * Math.sin(lat2Rad)
  );

  return D; 
};

const LocalityList = ({ province }) => {
  const [localities, setLocalities] = useState([]);
  const [filteredLocalities, setFilteredLocalities] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (province && province.idProvincia) {
      getLocalidades(province.idProvincia).then((localities) => {
        const localitiesWithDistance = localities.map(locality => {
          const distance = calculateDistance(parseFloat(locality.x), parseFloat(locality.y));
          return { ...locality, distancia: distance }; 
        });
        setLocalities(localitiesWithDistance);
        setFilteredLocalities(localitiesWithDistance);
      }).catch(console.error);
    }
  }, [province]);

  useEffect(() => {    
    const lowerCaseFilter = filter.toLowerCase();
    const filtered = localities.filter(locality => locality.nombre.toLowerCase().startsWith(lowerCaseFilter));
    setFilteredLocalities(filtered);
  }, [filter, localities]);

  const handleShowMap = (locality) => {
    setSelectedLocality(locality);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLocality(null);
  };

  const handleGuardarRecorrido = (locality) => {
    guardarRecorrido(locality.id, locality.recorrido)
      .then(() => alert('Recorrido guardado correctamente'))
      .catch(console.error);
  };

  return (
    <div>
      <h2>Localidades de {province.nombre}</h2>      
      
      <input
        type="text"
        placeholder="Filtrar por inicial"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      
      <table>
        <thead>
          <tr>
            <th>Localidad</th>
            <th>Distancia (km)</th>
            <th>G. Recorrido</th>
            <th>Ver mapa</th>
            <th>Guardar Recorrido</th>
          </tr>
        </thead>
        <tbody>
          {filteredLocalities.map((locality) => (
            <tr key={locality.id}>
              <td>{locality.nombre}</td>
              <td>{locality.distancia.toFixed(2)} km</td>
              <td>{locality.recorrido}</td>
              <td>
                <button onClick={() => handleShowMap(locality)}>Ver mapa</button>
              </td>
              <td>
                <button onClick={() => handleGuardarRecorrido(locality)}>Guardar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Mapa" style={{ overlay: { zIndex: 1000 } }}>
        <h3>Mapa de {selectedLocality ? selectedLocality.nombre : ''}</h3>
        {selectedLocality && (
          <MapComponent lat={parseFloat(selectedLocality.x)} lon={parseFloat(selectedLocality.y)} />
        )}
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default LocalityList;
