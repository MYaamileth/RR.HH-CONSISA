import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./mantenimientoUsuario.css";
import Swal from 'sweetalert2';

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


    //LLamada de pantalla despregable para crear un usuario
    const pantallaCrear = () => {
      Swal.fire({
        title: 'Crear Usuario',
        html: `
          <div class="input-container">
            <input
              type="text"
              placeholder="Usuario"
              class="textbox"
            />
            <input
              type="text"
              placeholder="Nombre Completo"
              class="textbox"
            />
          </div>
    
          <div class="input-container">
            <div class="flex-row">
              <input
                type="text"
                placeholder="Contraseña"
                class="textbox"
              />
              <input
                type="text"
                placeholder="Email"
                class="textbox"
              />
              <div class="checkbox-container">
                <div class="estado-container">
                  <label for="estado_usuario">Estado: </label>
                  <input 
                    type="checkbox"
                    id="estado_usuario"
                    class="input"
                  />
                </div>
                <span class="estado-label">Activo</span>
              </div>
            </div>
          </div>
    
          <div class="input-container">
            <div class="flex-row">
              <label>
                Puesto:
                <select class="inputPuesto">
                  <option value="administrador">Gerente de IT</option>
                  <option value="usuario">Administrador de BD</option>
                  <option value="agregarRol">Agregar Rol</option>
                </select>
              </label>
    
              <label>
                Rol:
                <select class="inputRol">
                  <option value="administrador">Administrador</option>
                  <option value="usuario">Usuario</option>
                  <option value="agregarRol">Agregar Rol</option>
                </select>
              </label>
            </div>
          </div>
        `,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Crear',
        cancelButtonText: 'Cancelar',
      }).then(response => {
        if(response.isConfirmed){
          creacionUsuario();
          Swal.fire('Usuario creado con éxito');
        } else if(response.isDenied){
          Swal.fire('Información', 'Registro cancelado', 'success')
        }
      })
    };
    

//Pantalla eliminar usuario
    const pantallaEditar = () => {
      Swal.fire({
        title: 'Editar Usuario',
        html: `
          
            <input
              type="text"
              placeholder="Usuario"
              class="textbox"
            />
            <input
              type="text"
              placeholder="Nombre Completo"
              class="textbox"
            />
          </div>
    
          <div class="input-container">
            <div class="flex-row">
              <input
                type="text"
                placeholder="Contraseña"
                class="textbox"
              />
              <input
                type="text"
                placeholder="Email"
                class="textbox"
              />
              <div class="checkbox-container">
                <div class="estado-container">
                  <label for="estado_usuario">Estado: </label>
                  <input 
                    type="checkbox"
                    id="estado_usuario"
                    class="input"
                  />
                </div>
                <span class="estado-label">Activo</span>
              </div>
            </div>
          </div>
    
          <div class="input-container">
            <div class="flex-row">
              <label>
                Puesto:
                <select class="inputPuesto">
                  <option value="administrador">Gerente de IT</option>
                  <option value="usuario">Administrador de BD</option>
                  <option value="agregarRol">Agregar Rol</option>
                </select>
              </label>
    
              <label>
                Rol:
                <select class="inputRol">
                  <option value="administrador">Administrador</option>
                  <option value="usuario">Usuario</option>
                  <option value="agregarRol">Agregar Rol</option>
                </select>
              </label>
            </div>
          </div>
        `,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
      }).then(response => {
        if(response.isConfirmed){
          //Función para el evio de datos al metodo para editar de la Api.
          //EditarUsuario();
          Swal.fire('Usuario editado con éxito');
        }else if(response.isDenied){
          Swal.fire('Información','Edición cancelada','success')
        }
      })
    };


//Pantalla eliminar usuario
    const pantallaEliminar = () => {
      Swal.fire({
        title: 'Eliminar Usuario',
        text: '¿Estás seguro de que deseas eliminar este usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí puedes llamar a la función para eliminar el usuario
          // eliminarUsuario();
          Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
        }
      });
    };
    





 
  
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
      
      //alert("Usuario registrado")
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
                
                <div className="form-buttons">
                  <button onClick={pantallaCrear} className="submit">Crear</button>
                  <button onClick={pantallaEditar} className="submit">Editar</button>
                  <button onClick={pantallaEliminar} className="submit">Eliminar</button>
                
                
                {/* <button className="submit">Revisar</button>  */}
              
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
