/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./mantenimientoUsuario.css";
import NuevoUsuario from "./NuevoUsuario.js"; // Importa el componente NuevoUsuario
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


const MantenimientoUsuario = () => {
  const [usuarioLista, setLista] = useState([]);
  const [edicion, setEditar] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    const traerUsuarios = async () => {
      try {
        setCargando(true);
        const response = await axios.get("http://localhost:3001/traerUsuarios");
        setLista(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al obtener los usuarios. Por favor, intenta de nuevo.',
        });
      } finally {
        setCargando(false);
      }
    };
    traerUsuarios();
  }, []);

  const listaFiltrada = usuarioLista.filter((usuario) => {
    return (
      usuario.Usuario.toLowerCase().includes(busqueda.toLowerCase()) || 
      usuario.Nombre_Completo_Usuario.toLowerCase().includes(busqueda.toLowerCase())
    );
  });

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <div data-maintenance-usuario="true" className="maintenance-container">
      {cargando ? (
        <div className="loading">Cargando...</div>
      ) : (
        <>
          <section className="formulario">
            <h1 className="mr-5 ml-5 mt-5">MANTENIMIENTO DE USUARIOS</h1>
            <p></p>
            <div className="form-buttons">
              <div className="search-container">
                <i className='bx bx-search icon'></i>
                <input
                  type="text"
                  placeholder="Buscar por Usuario o Nombre Completo"
                  className="search-input"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
              {/* Botón para abrir el modal */}
              <button className="submit" onClick={abrirModal}>CREAR</button>
              <button className="submit"> Generar Informe</button>
            </div>
            <section className="tabla-usuarios">
              <table className="table table-hover table-bordered" id="tblUsuarios">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Nombre Completo de Usuario</th>
                    <th>Correo Electronico</th>
                    <th>Fecha Vencimiento De Contraseña</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {listaFiltrada.length > 0 ? (
                    listaFiltrada.map((val, key) => {
                      return (
                        <tr key={key}>
                          <th>{val.Usuario}</th>
                          <th>{val.Nombre_Completo_Usuario}</th>
                          <th>{val.Correo_electronico}</th>
                          <th>{new Date(val.Fecha_ultima_conexion).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',second:'2-digit' })}</th>
                          <td> 
                            <div className="button-container">
                              <Link to="/EditarUsuario" className="submit icon-button">
                                <FontAwesomeIcon icon={faEdit} /> {/* Icono de editar */}
                              </Link>

                              <button className="submit icon-button">
                                <FontAwesomeIcon icon={faTrash} /> {/* Icono de eliminar */}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr key="no-results">
                      <td colSpan="5">
                        <p className="text-center">No se encontraron resultados</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section> 
            <script src="./Paginador.js"></script>
          </section>
          {/* Modal para el formulario de NuevoUsuario */}
          {mostrarModal && (
            <div className="modal-container">
              <div className="modal-content">
                <span className="close-button" onClick={cerrarModal}>&times;</span>
                <NuevoUsuario onClose={cerrarModal} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MantenimientoUsuario;
