import React, { useState, useEffect } from "react";
import "./nuevoUsuario.css";
import Swal from "sweetalert2";

const NuevoUsuario = ({ onClose }) => {
 
  const [estado, setEstado] = useState(1); // Estado activo por defecto
  const [roles, setRoles] = useState([]);
  const [puestos, setPuestos] = useState([]);
  const [empleado, setEmpleado] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [nombreCompletoUsuario, setNombreCompletoUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [correo_Electronico, setCorreo_Electronico] = useState("");
  const [primerIngreso, setPrimerIngreso] = useState("");

  //const [fechaUltimaConexion, setFechaUltimaConexion] = useState("");
  //const [fechaVencimiento, setFechaVencimiento] = useState("");
  // const [token, setToken] = useState("");
  //const [creado_Por, setCreadoPor] = useState("");
  //const [modificado_Por, setModificadoPor] = useState("");
  //const [fecha_Creacion, setFechaCreacion] = useState("");
  //const [fecha_Modificacion, setFechaModificacion] = useState("");

  //VARIABLES DE ENTORNO USADAS PARA LOS COMBOBOX
  const [idPuesto, setIdPuesto] = useState(""); //Almacena el ID del puesto seleccionado.
  const [idRol, setIdRol] = useState(""); //Almacena el ID del rol seleccionado.

  // SELECCION DE ROL DE USUARIO
  const [selectedRol, setSelectedRol] = useState(""); // Almacena el rol seleccionado por el usuario.
  const [rolErrorMessage, setRolErrorMessage] = useState(""); // Almacena el mensaje de error si no se ha seleccionado un rol.

  // SELECCION DE PUESTO DE USUARIO
  const [selectedPuesto, setSelectedPuesto] = useState(""); // Almacena el puesto seleccionado por el usuario.
  const [puestoErrorMessage, setPuestoErrorMessage] = useState(""); //Almacena el mensaje de error si no se ha seleccionado un puesto.

   // Obtener roles desde el servidor al cargar el componente
   useEffect(() => {
    const obtenerRoles = async () => {
      try {
        const response = await fetch("http://localhost:3001/obtenerRoles");
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error("Error al obtener los roles:", error.message);
      }
    };

    obtenerRoles();
  }, []);

  // Obtener puestos desde el servidor al cargar el componente
  useEffect(() => {
    const obtenerPuestos = async () => {
      try {
        const response = await fetch("http://localhost:3001/obtenerPuestos");
        const data = await response.json();
        setPuestos(data);
      } catch (error) {
        console.error("Error al obtener los puestos:", error.message);
      }
    };

    obtenerPuestos();
  }, []);

  //Inicio de la funcion CREAR
  const creacionUsuario = async (event) => {
    event.preventDefault();
    
    // Validación de campos antes de enviar la solicitud
    if (!selectedRol) {
      setRolErrorMessage("Debes seleccionar una opción de Rol");
      return;
    }

    if (!selectedPuesto) {
      setPuestoErrorMessage("Debes seleccionar una opción de Puesto");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/creacionUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id_Estado: estado,
          Id_Rol: obtenerIdRol(selectedRol),
          Id_Puesto: obtenerIdPuesto(selectedPuesto),
          Id_Empleado: "1",
          Usuario: usuario,
          Nombre_Completo_Usuario: nombreCompletoUsuario,
          Contraseña: contraseña,
          Primer_ingreso: null,
          Fecha_ultima_conexion: "2024-02-12",
          Correo_electronico: correo_Electronico,
          Fecha_vencimiento: "2024-02-12",
          Token: "131",
          Creado_por: "Marilyn Mejia",
          Modificado_por: "Marilyn Mejia",
          Fecha_creacion: "2024-03-16",
          Fecha_modificacion: "2024-03-16",
        }),
      });

      if (response.ok) {
        // Muestra la alerta de éxito
        Swal.fire({
          title: "Usuario creado",
          text: "El usuario ha sido creado con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  // Método para validar la selección de puesto y rol
  const validarPuesto = (event) => {
    const selectedOption = event.target.value;
    setPuestoErrorMessage(selectedOption ? "" : "Debes seleccionar un Puesto");
    setSelectedPuesto(selectedOption);
  };

  const validarRol = (event) => {
    const selectedOption = event.target.value;
    setRolErrorMessage(selectedOption ? "" : "Debes seleccionar un Rol");
    setSelectedRol(selectedOption);
  };

  // Método para obtener el ID del puesto y rol seleccionado
  const obtenerIdPuesto = (nombrePuesto) => {
    const puestoSeleccionado = puestos.find(
      (puesto) => puesto.Nombre_puesto === nombrePuesto
    );
    return puestoSeleccionado ? puestoSeleccionado.Id_Puesto : null;
  };

  const obtenerIdRol = (nombreRol) => {
    const rolSeleccionado = roles.find((rol) => rol.Rol === nombreRol);
    return rolSeleccionado ? rolSeleccionado.Id_Rol : null;
  };

  const cancelarCreacion = () => {
    onClose(); // Llama a la función onClose pasada como prop desde MantenimientoUsuario para cerrar el modal
  };


  return (
    <form onSubmit={creacionUsuario} className="Crear">
      <h1 id="Titulo">CREAR USUARIO</h1>

       {/* Input para el usuario */}
      <div className="input-container">
        <div className="input-group">
          <input
            onChange={(event) => {setUsuario(event.target.value); }}
            name="usuarioNuevo"
            type="text"
            placeholder="Usuario"
            className="textbox custom-input"
            maxLength={15}
            onInput={(e) => {
              const regex = /[^a-zA-Z0-9]/g;
              e.target.value = e.target.value.toUpperCase().replace(regex, "");
            }}
            required
            
          />
        </div>
       {/* Input para el nombre completo */}
       <div className="input-container">
          <input
            onChange={(event) => {setNombreCompletoUsuario(event.target.value);}}
            name="nombreCompletoUsuario"
            type="text"
            placeholder="Nombre Completo"
            className="textbox custom-input"
            maxLength={40}
           
            required
        />
      </div>
        </div>
      

      {/* Input para la contraseña */}
      <div className="input-container">
        <div className="flex-row">
          <input
            onChange={(event) => { setContraseña(event.target.value); }}
            name="contraseña"
            type="password"
            placeholder="Contraseña"
            className="textbox custom-input"
            maxLength={20}
          minLength={8}
          required
        />
      </div>
         
      {/* Input para el correo electrónico */}
      <div className="input-container">
        <input
            onChange={(event) => {setCorreo_Electronico(event.target.value);  }}
            name="correo_Electronico"
            type="text"
            placeholder="Email"
            className="textbox custom-input"
            maxLength={45}
            required
        />
      </div>
        </div>
   

      {/* Otro contenedor de inputs */}
      <div className="input-container">
        {/* Selección de PUESTO */}
        <div className="flex-row">
          <label className="custom-label">
            Puesto:
            <select
              className="inputPuesto custom-select"
              onChange={validarPuesto}
              value={selectedPuesto}
              required
            >
              <option value="">Selecciona un Puesto</option>
              {puestos.map((puestoObject, index) => (
                <option key={index} value={puestoObject.Nombre_puesto}>
                  {puestoObject.Nombre_puesto}
                </option>
              ))}
            </select>
          </label>
          

          {/* Selección de ROL */}
          <label className="custom-label">
            Rol:
            <select
              className="inputRol custom-select"
              onChange={validarRol}
              value={selectedRol}
              required
            >
              <option value="">Selecciona un rol</option>
              {roles.map((rolObject, index) => (
                <option key={index} value={rolObject.Rol}>
                  {rolObject.Rol}
                </option>
              ))}
            </select>
          </label>
        
        </div>
      </div>

      {/*Creación de botones*/}

      <div className="form-buttons-crear">
        <button id="crear" type="submit">
          CREAR
        </button>
        <span className="button-spacing"></span> {/* Espacio entre botones */}
        <button id="cancelar" type="button" onClick={cancelarCreacion}>
          CANCELAR
        </button>
      </div>
    </form>
  );
};

export default NuevoUsuario;
