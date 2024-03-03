import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mantenimientoUsuario.css';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setCargando(true);
      const response = await axios.get("http://localhost:3000/TraerUsuarios");
      setUsuarios(response.data);
      setCargando(false);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <header>
        <div className="logo">
          <img src="logo.png" alt="Logo Grupo Consisa" />
        </div>
        <div className="titulo">
          <h1>Usuarios</h1>
        </div>
      </header>
      <main>
        <section className="busqueda">
          <h2>Buscar por ID de Empleado</h2>
        </section>
        {cargando ? (
          <div className="cargando">Cargando...</div>
        ) : (
          <section className="tabla-usuarios">
            <table>
              <thead>
                <tr>
                  <th>ID de Usuario</th>
                  <th>ID de Empleado</th>
                  <th>ID de Fook</th>
                  <th>Usuario</th>
                  <th>Contraseña</th>
                  <th>Ultima Fecha de Conexion</th>
                  <th>Fecha de Primera Conexión</th>
                  <th>Preguntas Contestadas</th>
                  <th>Fecha Vencimiento De Contraseña</th>
                  <th>Creado Por</th>
                  <th>Fecha de Creación</th>
                  <th>Modificado Por</th>
                  <th>Fecha de Modificación</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id_usuario}>
                    <td>{usuario.id_usuario}</td>
                    <td>{usuario.id_empleado}</td>
                    <td>{usuario.id_fook}</td>
                    <td>{usuario.usuario}</td>
                    <td>{usuario.contrasena}</td>
                    <td>{usuario.ultima_fecha_conexion}</td>
                    <td>{usuario.fecha_primera_conexion}</td>
                    <td>{usuario.preguntas_contestadas}</td>
                    <td>{usuario.fecha_vencimiento_contrasena}</td>
                    <td>{usuario.creado_por}</td>
                    <td>{usuario.fecha_creacion}</td>
                    <td>{usuario.modificado}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
        <section className="acciones">
          <button>Nuevo Usuario</button>
          <button>Editar Usuario</button>
          <button>Eliminar Usuario</button>
          <button>Ver Empleados</button>
        </section>
      </main>
    </div>
  );
}

export default Usuarios;
