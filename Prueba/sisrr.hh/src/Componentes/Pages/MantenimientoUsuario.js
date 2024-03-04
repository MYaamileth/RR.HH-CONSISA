import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mantenimientoUsuario.css';
import { Link } from 'react-router-dom';



//Con el useeffect estoy trayendo todos los datos de la tabla usuario
const MantenimientoUsuario = ()=>{
  // Variable de estado para indicar si se está cargando la información
  const [cargando, setCargando] = useState(false);
  const [usuarios, setUsuarios] = useState([])
  useEffect(()=>{ 
    const fecthAllUsuarios = async () =>{
      try {
        const res = await axios.get("http://localhost:8800/Usuario")
        setUsuarios(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    fecthAllUsuarios()
  }, [])

  return (
    <div className="container">
      {cargando ? (
        <div className="cargando">Cargando...</div>
      ) : (
        <>
          {/* Header section */}
          <header>
            <div className="logo">
              <img src="Icono.png" alt="Logo Grupo Consisa" />
            </div>
            <div className="titulo">
              <h1>Usuarios</h1>
            </div>
          </header>

          {/* Search section */}
          <main>
            <section className="busqueda">
              <h2>Buscar empleado por medio de Id:</h2>
              <input type="text" placeholder="Ingrese ID de Empleado" />
            </section>

            {/*TABLA DE REGSITROS*/}
            <section className="tabla-usuarios">
              <table>
                <thead>
                  <tr>
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
                      <td>{usuario.usuario}</td>
                      <td>{usuario.nombreCompletoUsuario}</td>
                      <td>{usuario.contrasena}</td>
                      <td>{usuario.fecha_Ultima_Conexion}</td>
                      <td>{usuario.primer_Ingreso}</td>
                      <td>{usuario.correo_Electronico}</td>
                      <td>{usuario.fecha_Vencimiento}</td>
                      <td>{usuario.creado_Por}</td>
                      <td>{usuario.modificado_Por}</td>
                      <td>{usuario.fecha_Creacion}</td>
                      <td>{usuario.fecha_Modificacion}</td>
                    </tr> 
                  ))}
                </tbody>
              </table>
            </section>

            {/* BOTONES PARA LA CRUD DE USUARIOS) */}
            <section className="acciones">
              <button>
                <Link> Nuevo usuario</Link>
              </button>
              <button>
                <Link> Editar usuario</Link>
              </button>
              <button>
                <Link> Eliminar usuario</Link>
              </button>
              <button>
                <Link> Revisar usuario</Link>
              </button>
              {/* Form and button implementation are missing */}
            </section>
          </main>
        </>
      )}
    </div>
  );
};


export default MantenimientoUsuario
/*
function Usuarios() {
  
  // Variables de estado para la entrada de nuevo usuario
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombreUsuario: '',
    contraseña: '',
    nombreCompleto: '',
    rol: '',
    estado: false
  });
  // Variable de estado para indicar si se está cargando la información
  const [cargando, setCargando] = useState(false);

  // Obtiene datos de la API al montar el componente
  useEffect(() => {
    const fecthAllUsuarios= async () => {
      setCargando(true);
      const response = await axios.get("http://localhost:3000/TraerUsuarios");
      setUsuarios(response.data);
      setCargando(false);
    };
    fetchData();
  }, []);

  // Maneja el cambio de entrada para los campos del nuevo usuario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setNuevoUsuario({ ...nuevoUsuario, [name]: inputValue });
  };

  // Maneja el envío del formulario para crear un nuevo usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía una solicitud POST para crear un nuevo usuario
      await axios.post("http://localhost:3000/CrearUsuario", nuevoUsuario);
      // Obtiene la lista actualizada de usuarios
      const response = await axios.get("http://localhost:3000/TraerUsuarios");
      setUsuarios(response.data);
      // Limpia los campos de entrada después de la creación exitosa
      setNuevoUsuario({
        nombreUsuario: '',
        contraseña: '',
        nombreCompleto: '',
        rol: '',
        estado: false
      });
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  // Renderiza los elementos JSX
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
          {/* Es probable que falte un campo de entrada para buscar por ID aquí } AQUI
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
          {/* Inputs para encapsular los datos para el nuevo usuario }AQUI
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombreUsuario">Nombre de Usuario:</label>
            <input
              type="text"
              id="nombreUsuario"
              name="nombreUsuario"
              value={nuevoUsuario.nombreUsuario}
              onChange={handleInputChange}
            />
            <label htmlFor="contraseña">Contraseña:</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              value={nuevoUsuario.contraseña}
              onChange={handleInputChange}
            />
            <label htmlFor="nombreCompleto">Nombre Completo:</label>
            <input
              type="text"
              id="nombreCompleto"
              name="nombreCompleto"
              value={nuevoUsuario.nombreCompleto}
              onChange={handleInputChange}
            />
            <label htmlFor="rol">Rol:</label>
            <select
              id="rol"
              name="rol"
              value={nuevoUsuario.rol}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar Rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Empleado">Empleado</option>
            </select>
            <label htmlFor="estado">Estado:</label>
            <input
              type="checkbox"
              id="estado"
              name="estado"
              checked={nuevoUsuario.estado}
              onChange={handleInputChange}
            />
            <button type="submit">Crear Usuario</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Usuarios;*/
