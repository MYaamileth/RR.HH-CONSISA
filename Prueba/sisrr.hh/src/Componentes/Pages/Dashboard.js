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
    <div className="dashboard">
      <nav className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
        <header>
          <div className="image-text">
            <i className='bx bxs-doughnut-chart logo'></i>

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


              <li className="nav-link with-submenu">
                <a href="#">
                  <i className='bx bx-street-view icon'></i>
                  <span className="text nav-text">Empleados</span>
                </a>
                {/* Submenu for Empleados */}
                {isSidebarClosed ? null : (
                  <ul className="Empleados">
                    <li>
                      <a href="#">
                        <i class='bx bxs-briefcase-alt-2 icon' ></i>
                        <span className="text nav-text">   Administrar Empleados</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class='bx bxs-user-rectangle icon'></i>
                        <span className="text nav-text">   Administrar Usuarios</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class='bx bxs-file icon' ></i>
                        <span className="text nav-text">   Contratos</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class='bx bx-current-location icon'></i>
                        <span className="text nav-text">   Departamentos</span>
                      </a>
                    </li>
                    {/* Add more submenu items as needed */}
                  </ul>
                )}
              </li>


              <li className="nav-link with-submenu">
                <a href="#">
                  <i class='bx bxs-folder-open icon' ></i>
                  <span className="text nav-text">Planillas</span>
                </a>
                {/* Submenu for Planillas */}
                {isSidebarClosed ? null : (
                  <ul className="Planilla">
                    <li>
                      <a href="#">
                        <i class='bx bxs-calendar-plus icon' ></i>
                        <span className="text nav-text">   Crear Planilla</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                      <i class='bx bxs-calendar-event icon' ></i>
                        <span className="text nav-text">   Historial de Planillas</span>
                      </a>
                    </li>
                    {/* Add more submenu items as needed */}
                  </ul>
                )}
              </li>


              <li className="nav-link">
                <a href="#">
                  <i class='bx bxs-bell icon' ></i>
                  <span className="text nav-text">Buzón</span>
                </a>
              </li>


              <li className="nav-link with-submenu">
                <a href="#">
                  <i class='bx bx-shield-quarter icon'></i>
                  <span className="text nav-text">Seguridad</span>
                </a>
                {/* Submenu for Seguridad */}
                {isSidebarClosed ? null : (
                  <ul className="Seguridad">
                    <li>
                      <a href="#">
                        <i class='bx bxs-data icon' ></i>
                        <span className="text nav-text">Parámetros del Sistemas</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class='bx bx-code-block icon' ></i>                   
                        <span className="text nav-text">Parámetros de Seguridad</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class='bx bxs-log-in icon' ></i>
                        <span className="text nav-text">Acceso al Sistema</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class='bx bxs-user-detail icon' ></i>
                        <span className="text nav-text">Bitácora</span>
                      </a>
                    </li>
                    {/* Add more submenu items as needed */}
                  </ul>
                )}
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


