import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./mantenimientoUsuario.css";

const MantenimientoUsuario = () => {
  const [cargando, setCargando] = useState(false);
   //Trae valores capturados por los campos del frontend
   useEffect(() => {
    const traerUsuarios = async () => {
      const response = await axios.get("http://localhost:3001/traerUsuarios");
      setLista(response.data);
    };
  
    traerUsuarios();
  }, []);
  /*const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchAllUsuarios = async () => {
      try {
        const res = await axios.get("http://localhost:8800/Usuario");
        setUsuarios(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsuarios();
  }, []);*/

  // const res = await axios.get("http://localhost:8800/Usuario")

  // Variable de estado para indicar si se está cargando la información
  const [idusuario, setIdUsuario] = useState("");
  const [estado, setEstado] = useState("");
  const [roles, setRoles] = useState("");
  const [puesto, setPuesto] = useState("");
  const [usuario, setUsuario] = useState("");
  const [nombreCompletoUsuario, setNombreCompletoUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [fecha_Ultima_Conexion, setFecha_Ultima_Conexion] = useState("");
  const [primer_Ingreso, setPimerIngreso] = useState("");
  const [correo_Electronico, setCorreo_Electronico] = useState("");
  const [fecha_Vencimiento, setFecha_Vencimiento] = useState("");
  const [creado_Por, setCreado_Por] = useState("");
  const [modificado_Por, setModificado_Por] = useState("");
  const [fecha_Creacion, setFecha_Creacion] = useState("");
  const [fecha_Modificacion, setFecha_Modificacion] = useState("");
  


  const [usuarioLista, setLista]=useState([]);//Lita para trer usuarios



  //EMPIEZA CRUD

  //Envio de valores capturados por los campos del frontend
  const creacionUsuario =()=>{
    axios.post("http://localhost:3001/creacionUsuario", {
   

      //LOS CAMPOS ANTERIORES DESPUES DE DEBEN ELIMINAR DESPUES
      Id_Estado: estado,
      Id_rol: roles,
      Id_puesto: puesto,
      Usuario: usuario,
      Nombre_Completo_Usuario: nombreCompletoUsuario,
      Contraseña: contraseña,
      Fecha_Ultima_Conexion: fecha_Ultima_Conexion,
      Primer_ingreso: primer_Ingreso,
      Correo_electronico: correo_Electronico,
      Fecha_vencimiento: fecha_Vencimiento,
      Creado_por: creado_Por,
      Modificado_por: modificado_Por,
      Fecha_creacion: fecha_Creacion,
      Fecha_modificacion: fecha_Modificacion
    }). then(()=> {
      //traerUsuarios(); //cada que se guarde un usuario se enlistara en la tabla
      alert("Usuario registrado")
    });
  }

 

  //traerUsuarios(); //Desde que se ingresa al apartado, traera los usuarios

//EN LOS CAMPOS DE USUARIO Y EMAIL, CA,BIAR EL SET UNA VEZ QUE FUNIONE, PUES ESTAN LOS DE PRUEBA
  return (
    <div data-maintenance-usuario="true" className="maintenance-container">
      {cargando ? (
        <div className="loading">Cargando...</div>
      ) : (
        <>
          <main>
            <section className="formulario">
              <div className="form-container">
                <h1>MANTENIMIENTO DE USUARIOS</h1>
                <p></p>
                <div className="input-container">
                  <input 
                    type="text"
                    placeholder="ID Usuario"
                    className="textbox"
                  />
                  <input
                    onChange={(event) =>{//el "event" guada lo que se ingreso en el campo
                      setUsuario(event.target.value); //con el "target" nosotros estamos diciendo que queremos el valor y se lo asignamo a "setusuario"
                    }}
                    type="text"
                    placeholder="Usuario"
                    className="textbox"
                  />
                  <input
                    onChange={(event) =>{//el "event" guada lo que se ingreso en el campo
                      setNombreCompletoUsuario(event.target.value); //con el "target" nosotros estamos diciendo que queremos el valor y se lo asignamo a "setusuario"
                    }}
                    type="text"
                    placeholder="Nombre Completo"
                    className="textbox"
                  />
                </div>

                <div className="input-container">
                  <div className="flex-row">
                    <input
                      onChange={(event) =>{//el "event" guada lo que se ingreso en el campo
                        setContraseña(event.target.value); //con el "target" nosotros estamos diciendo que queremos el valor y se lo asignamo a "setusuario"
                      }}
                      type="text"
                      placeholder="Contraseña"
                      className="textbox"
                    />
                    <input
                      onChange={(event) =>{//el "event" guada lo que se ingreso en el campo
                        setCorreo_Electronico(event.target.value); //con el "target" nosotros estamos diciendo que queremos el valor y se lo asignamo a "setusuario"
                      }}
                      type="text"
                      placeholder="Email"
                      className="textbox"
                    />
                    <div className="checkbox-container">
                      <div className="estado-container">
                        <label htmlFor="estado_usuario">Estado: </label>
                        <input 
                          onChange={(event) =>{//el "event" guada lo que se ingreso en el campo
                            setEstado(event.target.value); //con el "target" nosotros estamos diciendo que queremos el valor y se lo asignamo a "setusuario"
                          }}
                          type="checkbox"
                          id="estado_usuario"
                          className="input"
                        />
                      </div>
                      <span className="estado-label">Activo</span>
                    </div>
                  </div>
                </div>

                <div className="input-container">
                  <div className="flex-row">
                    <label>
                      Puesto:
                      <select className="inputPuesto"  onChange={(event) => setPuesto(event.target.value)}>
                        <option value="administrador">Gerente de IT</option>
                        <option value="usuario">Administrador de BD</option>
                        <option value="agregarRol">Agregar Rol</option>
                      </select>
                    </label>

                    <label>
                      Rol:
                      <select className="inputRol " onChange={(event) => setRoles(event.target.value)} >
                        <option value="administrador">Administrador</option>
                        <option value="usuario">Usuario</option>
                        <option value="agregarRol">Agregar Rol</option>
                      </select>
                    </label>
                  </div>
                </div>
  
                <div className="form-buttons">
                  <button onClick={creacionUsuario} className="submit">Crear</button>
                  <button className="submit">Editar</button>
                  <button className="submit">Eliminar</button>
                  <button className="submit">Revisar</button>
                </div>
              </div>
            </section>
            <section className="tabla-usuarios">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID Usuario</th>
                    <th>Usuario</th>
                    <th>Nombre Completo de Usuario</th>
                    <th>Contraseña</th>
                    <th>Fecha Vencimiento De Contraseña</th>
                  </tr>
                </thead>
                <tbody>
                {usuarioLista.map((val, key) => {
                    return   <tr>
                            <th>{val.Id_Estado}</th>
                            <th>{val.Id_rol}</th>
                            <th>{val.Id_puesto}</th>
                            <th>{val.Usuario}</th>
                            <th>{val.Nombre_Completo_Usuario}</th>
                            <th>{val.Contraseña}</th>
                            <th>{val.Fecha_Ultima_Conexion}</th>
                            <th>{val.Primer_ingreso}</th>
                            <th>{val.Correo_electronico}</th>
                            <th>{val.Fecha_vencimiento}</th>
                            <th>{val.Creado_por}</th>
                            <th>{val.Modificado_por}</th>
                            <th>{val.Fecha_creacion}</th>
                            <th>{val.Fecha_modificacion}</th>
                            </tr>
                   })
                  }
                    
                </tbody>
              </table>
            </section>
                           
          </main>
        </>
      )}
    </div>
  );
};

export default MantenimientoUsuario;
