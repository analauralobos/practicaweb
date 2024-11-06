import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MapModal = ({ show, handleClose, localidad }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Mapa de {localidad?.nombre}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Ubicación: latitud {localidad?.latitud}, longitud {localidad?.longitud}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
);

export default MapModal;
