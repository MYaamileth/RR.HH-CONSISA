import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./mantenimientoUsuario.css";
import NuevoUsuario from "./NuevoUsuario.js";
import EditarUsuario from "./EditarUsuario.js"; // Importar el componente EditarUsuario
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const MantenimientoUsuario = () => {
  const [usuarioLista, setLista] = useState([]);
  const [edicion, setEditar] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false); // Estado para controlar la visibilidad del modal
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false); // Estado para controlar la visibilidad del modal de edición
  const [mostrarModalDeshabilitar, setmostrarModalDeshabilitar] = useState(false); // Estado para controlar la visibilidad del modal de edición

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Estado para almacenar el usuario seleccionado

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
  
  //MODAL DE CREAR
  const abrirModal = () => {
    setMostrarModalNuevo(true);
  };
  const cerrarModal = () => {
    setMostrarModalNuevo(false);
  };


  //MODALES DE EDICION
  const abrirModalEdicion = (userId) => {
    setUsuarioSeleccionado(userId); // Almacenar el ID del usuario seleccionado
    setMostrarModalEdicion(true);
  };
  const cerrarModalEdicion = () => {
    setMostrarModalEdicion(false);
  };

// Función para eliminar/deshabilitar un usuario
const eliminarUsuario = async (idUsuario) => {
  try {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar/deshabilitar el usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar/deshabilitar",
      cancelButtonText: "Cancelar",
      allowOutsideClick: false // Evitar que se cierre haciendo clic fuera del modal
    });

    if (confirmacion.isConfirmed) {
      // Realizar la solicitud PUT al backend para eliminar/deshabilitar el usuario
      const response = await fetch(`http://localhost:3001/deshabilitarUsuario/${idUsuario}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Actualizar la lista de usuarios después de eliminar/deshabilitar
        const updatedList = usuarioLista.filter(usuario => usuario.Id_usuario !== idUsuario);
        setLista(updatedList);

        Swal.fire({
          title: "¡Éxito!",
          text: "El usuario ha sido eliminado/deshabilitado correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        throw new Error("Error en la solicitud");
      }
    }
  } catch (error) {
    console.error("Error al eliminar/deshabilitar el usuario:", error);
    // Manejar el error aquí
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error al eliminar/deshabilitar el usuario. Por favor, intenta de nuevo.',
    });
  }
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
                            <button className="submit icon-button" onClick={() => abrirModalEdicion(val.Id_usuario)}>
                                <FontAwesomeIcon icon={faEdit} /> {/* Icono de editar */}
                              </button>
                            <button className="submit icon-button" onClick={() => eliminarUsuario(val.Id_usuario)}>                      
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
          </section>
          {/* Modal para el formulario de NuevoUsuario */}
          {mostrarModalNuevo && (
            <div className="modal-container">
              <div className="modal-content">
                <span className="close-button" onClick={cerrarModal}>&times;</span>
                <NuevoUsuario onClose={cerrarModal} />
              </div>
            </div>
          )}
          {/* Modal para el formulario de EditarUsuario */}
          {mostrarModalEdicion && (
            <div className="modal-container">
              <div className="modal-content">
                <span className="close-button" onClick={cerrarModalEdicion}>&times;</span>
                {/* Pasar el ID del usuario al componente EditarUsuario */}
            <EditarUsuario onClose={cerrarModalEdicion} Id_usuario={usuarioSeleccionado} />
          </div>
            </div>
          )}
            
        </>
      )}
    </div>
  );
};

export default MantenimientoUsuario;



 

 
