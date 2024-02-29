import React, { useState } from 'react';
import './inicio.css';

const Home = () => {
  const [showSolicitudesMenu, setShowSolicitudesMenu] = useState(false);

  const handleSolicitudesClick = () => {
    setShowSolicitudesMenu(!showSolicitudesMenu);
  };

  return (
    <div className="-container">
      <div className="home-header">
        <div className="home-logo">CONSISA</div>
        <div className="home-menu">
          <div className="home-menu-item">Inicio</div>
          <div className="home-menu-item">Grupo Consisa</div>
          <div className="home-menu-item">Tecnología Innovación. Experiencia</div>
          <div className="home-menu-item" onClick={handleSolicitudesClick}>
            Vacaciones
            {showSolicitudesMenu && (
              <div className="solicitudes-menu">
                <div className="solicitudes-menu-item">Mis Solicitudes</div>
                <div className="solicitudes-menu-item">Boton para ver</div>
              </div>
            )}
          </div>
        </div>
        <div className="home-button">Boton de inicio</div>
      </div>
      <div className="home-welcome">BIENVENIDO USUARIO</div>
      <div className="home-user">
        <div className="home-user-name">Daniel Pineda</div>
        <div className="home-user-profile">
          <img src="https://example.com/profile-image.jpg" alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default Home;