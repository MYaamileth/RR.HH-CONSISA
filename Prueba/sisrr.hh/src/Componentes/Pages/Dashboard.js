import React, { useState } from 'react';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import MantenimientoUsuario from './MantenimientoUsuario'; // Importa el nuevo componente

const Dashboard = () => {
  const [isSidebarClosed, setSidebarClosed] = useState(false);
  const [showMantenimientoUsuario, setShowMantenimientoUsuario] = useState(false); // Nuevo estado para controlar la visibilidad del formulario

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  const openSearch = () => {
    setSidebarClosed(false);
  };

  const handleMantenimientoUsuario = (e) => {
    e.preventDefault();
    setShowMantenimientoUsuario(true); // Al hacer clic en "Administrar Usuarios", mostrar el formulario
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
                        <i className='bx bxs-briefcase-alt-2 icon' ></i>
                        <span className="text nav-text">   Administrar Empleados</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className='bx bxs-user-rectangle icon'></i>
                        <span className="text nav-text" onClick={handleMantenimientoUsuario}>   Administrar Usuarios</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className='bx bxs-file icon' ></i>
                        <span className="text nav-text">   Contratos</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className='bx bx-current-location icon'></i>
                        <span className="text nav-text">   Departamentos</span>
                      </a>
                    </li>
                    {/* Add more submenu items as needed */}
                  </ul>
                )}
              </li>

              <li className="nav-link with-submenu">
                <a href="#">
                  <i className='bx bxs-folder-open icon' ></i>
                  <span className="text nav-text">Planillas</span>
                </a>
                {/* Submenu for Planillas */}
                {isSidebarClosed ? null : (
                  <ul className="Planilla">
                    <li>
                      <a href="#">
                        <i className='bx bxs-calendar-plus icon' ></i>
                        <span className="text nav-text">   Crear Planilla</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className='bx bxs-calendar-event icon' ></i>
                        <span className="text nav-text">   Historial de Planillas</span>
                      </a>
                    </li>
                    {/* Add more submenu items as needed */}
                  </ul>
                )}
              </li>

              <li className="nav-link">
                <a href="#">
                  <i className='bx bxs-bell icon' ></i>
                  <span className="text nav-text">Buzón</span>
                </a>
              </li>

              <li className="nav-link with-submenu">
                <a href="#">
                  <i className='bx bx-shield-quarter icon'></i>
                  <span className="text nav-text">Seguridad</span>
                </a>
                {/* Submenu for Seguridad */}
                {isSidebarClosed ? null : (
                  <ul className="Seguridad">
                    <li>
                      <a href="#">
                        <i className='bx bxs-data icon' ></i>
                        <span className="text nav-text">Parámetros del Sistemas</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className='bx bx-code-block icon' ></i>                   
                        <span className="text nav-text">Parámetros de Seguridad</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className='bx bxs-log-in icon' ></i>
                        <span className="text nav-text">Acceso al Sistema</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className='bx bxs-user-detail icon' ></i>
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
        <div className="text">
          {/* Mostrar el formulario si showMantenimientoUsuario es true */}
          {showMantenimientoUsuario && <MantenimientoUsuario />}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
