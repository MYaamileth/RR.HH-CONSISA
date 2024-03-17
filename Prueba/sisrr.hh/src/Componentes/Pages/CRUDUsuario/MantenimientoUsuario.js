/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./mantenimientoUsuario.css";
import Swal from 'sweetalert2';




const MantenimientoUsuario = () => {
 

  const [usuarioLista, setLista] = useState([]); // Lista para traer usuarios
  const [edicion, setEditar] = useState(false);
  const [cargando, setCargando] = useState(false);



  //Trae valores capturados por los campos del frontend
  useEffect(() => {
    const traerUsuarios = async () => {
      const response = await axios.get("http://localhost:3001/traerUsuarios");
      setLista(response.data);
      
    };
  
    traerUsuarios();
  }, []);

  // Filtro de usuarios basado en la búsqueda
  const [busqueda, setBusqueda] = useState("");
  const listaFiltrada = usuarioLista.filter((usuario) => {
    return (
      usuario.Usuario.toLowerCase().includes(busqueda.toLowerCase()) || usuario.Nombre_Completo_Usuario.toLowerCase().includes( busqueda.toLowerCase()));
   });

 


 
    //TODO LO DE AQUI SE MUESTRA EN LA INTERFAZ
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

                  <Link to="/NuevoUsuario" className="submit">CREAR</Link>

                  {/* <Link to="/EliminarUsuario" className="submit">Eliminar</Link> */}
                

                  {/*  <button className="submit" on onClick={nuevoUsuario}> Ir a crear usuario</button> */}
                 

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
                  usuarioLista.map((val, key) => {
                    return (
                      <tr key={key}>
                        <th>{val.Usuario}</th>
                        <th>{val.Nombre_Completo_Usuario}</th>
                        <th>{val.Correo_electronico}</th>
                       {/*Método tpLocaleString(),dara formato de presentación para las fechas */}
                        <th>{new Date(val.Fecha_ultima_conexion).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',second:'2-digit' })}</th>
                        <td> 
                          <Link to="/EditarUsuario" className="submit icon-button">Editar</Link>
                          <button  className="submit icon-button">Eliminar</button>
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
        </>
      )}
    </div>
  );
};

export default MantenimientoUsuario;