import React, { useState } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [isSidebarClosed, setSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  const openSearch = () => {
    setSidebarClosed(false);
  };

  return (
    <div className="dashboard"> {/* Removed dark mode class */}
      <nav className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
        <header>
          <div className="image-text">
            <i class='bx bxs-doughnut-chart logo'></i>

            <div className="text logo-text">
              <span className="name">CONSISA</span>
              <span className="profession">Tecnología • Innovación • Experiencia</span>
            </div>
          </div>

          <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li className="search-box" onClick={openSearch}>
              <i className='bx bx-search icon'></i>
              <input type="text" placeholder="Buscar..." />
            </li>

            <ul className="menu-links">
              <li className="nav-link">
                <a href="#">
                  <i className='bx bx-home-alt icon' ></i>
                  <span className="text nav-text">Inicio</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <i class='bx bx-street-view icon'></i>
                  <span className="text nav-text">Empleados</span>
                </a>
              </li>

              {/* Add more menu items as needed */}
            </ul>
          </div>

          <div className="bottom-content">
            <li>
              <a href="#">
                <i className='bx bx-log-out icon'></i>
                <span className="text nav-text">Cerrar Sesión</span>
              </a>
            </li>
          </div>
        </div>
      </nav>

      <section className="home">
        <div className="text">¡Bienvenido Administrador!</div>
      </section>
    </div>
  );
};

export default Dashboard;
