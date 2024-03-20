import React, { useState, useEffect } from "react";
import "./nuevoUsuario.css";
import Swal from 'sweetalert2';


const NuevoUsuario = ({onClose}) => {
  const [estado, setEstado] = useState(1); // Estado activo por defecto
  const [roles, setRoles] = useState([]);
  const [puestos, setPuestos] = useState([]);
  const [empleado, setEmpleado] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [nombreCompletoUsuario, setNombreCompletoUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [primerIngreso, setPrimerIngreso] = useState(1); // Primer ingreso activado por defecto
  const [correo_Electronico, setCorreo_Electronico] = useState("");
  //const [fechaUltimaConexion, setFechaUltimaConexion] = useState("");
  //const [fechaVencimiento, setFechaVencimiento] = useState("");
 // const [token, setToken] = useState("");
  const [idPuesto, setIdPuesto] = useState("");
  const [idRol, setIdRol] = useState("");

  // SELECCION DE ROL DE USUARIO
  const [selectedRol, setSelectedRol] = useState("");
  const [rolErrorMessage, setRolErrorMessage] = useState("");

  // SELECCION DE PUESTO DE USUARIO
  const [selectedPuesto, setSelectedPuesto] = useState("");
  const [puestoErrorMessage, setPuestoErrorMessage] = useState("");

  //const [creado_Por, setCreadoPor] = useState("");
  //const [modificado_Por, setModificadoPor] = useState("");
  //const [fecha_Creacion, setFechaCreacion] = useState("");
  //const [fecha_Modificacion, setFechaModificacion] = useState("");
  

  // Método para validar la selección de puesto
  const validarPuesto = (event) => {
    const selectedOption = event.target.value;
    let errorMessage = "";

    if (!selectedOption) {
      errorMessage = "Debes seleccionar una opción de Puesto";
    }

    setPuestoErrorMessage(errorMessage);
    setSelectedPuesto(selectedOption);
    setIdPuesto(obtenerIdPuesto(selectedOption)); // Obtener ID del puesto y actualizar estado
  };

// Método para obtener el ID del puesto seleccionado
const obtenerIdPuesto = (nombrePuesto) => {
  const puestoSeleccionado = puestos.find(
    (puesto) => puesto.Nombre_puesto === nombrePuesto
  );
  return puestoSeleccionado ? puestoSeleccionado.Id_puesto : null;
};

// Método para validar la selección de rol
const validarRol = (event) => {
const selectedOption = event.target.value;
let errorMessage = "";

if (!selectedOption) {
  errorMessage = "Debes seleccionar una opción de Rol";
}

setRolErrorMessage(errorMessage);
setSelectedRol(selectedOption);
setIdRol(obtenerIdRol(selectedOption)); // Actualizar el ID del rol seleccionado
};

// Método para obtener el ID del rol seleccionado
const obtenerIdRol = (nombreRol) => {
const rolSeleccionado = roles.find(
  (roles) => roles.Rol === nombreRol
);
return rolSeleccionado ? rolSeleccionado.Id_Rol : null;
};

const creacionUsuario = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch("http://localhost:3001/creacionUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id_estado: "1",
        Id_Rol: "1",
        Id_puesto: idPuesto,
        Id_Empleado: "1",
        Usuario: usuario,
        Nombre_Completo_Usuario: nombreCompletoUsuario,
        Contraseña: contraseña,
        Primer_ingreso: "1",
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
        title: 'Usuario creado',
        text: 'El usuario ha sido creado con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } else {
      throw new Error("Error en la solicitud");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error.message);
    
  }
};


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

  const cancelarCreacion = () => {
    onClose(); // Llama a la función onClose pasada como prop desde MantenimientoUsuario para cerrar el modal
  };


  return (
    <form onSubmit={creacionUsuario} className="Crear">
      <h1 id="Titulo">CREAR USUARIO</h1>

      <div className="input-container">
        <div className="input-group">
          <input
            onChange={(event) => {
              setUsuario(event.target.value);
            }}
            name="usuario"
            type="text"
            placeholder="Usuario"
            className="textbox custom-input"
            maxLength={15}
            onKeyPress={(event) => {const char = event.key; const inputValue = event.target.value.toUpperCase();
              if (!/[A-Z]/.test(char)) {
                event.preventDefault();
                event.target.nextElementSibling.textContent = "Solo se permiten mayúsculas";
              } else if (inputValue.length >= 15) {
                event.preventDefault();
                event.target.nextElementSibling.textContent = "Máximo de caracteres alcanzados";
              } else {
                event.target.nextElementSibling.textContent = ""; // Reinicia el mensaje de error si se ingresa una mayúscula
              }
            }}
          />
          <span className="error-message" style={{ color: "red" }}></span>
        </div>

        <div className="input-group">
          <input
            onChange={(event) => {
              setNombreCompletoUsuario(event.target.value);
            }}
            name="nombreCompletoUsuario"
            type="text"
            placeholder="Nombre Completo"
            className="textbox custom-input"
            maxLength={40}// Limita la longitud del input a 40 caracteres
            onKeyPress={(event) => {
              const char = event.key;
              if (!/[a-zA-Z\s]/.test(char)) { // Verifica si el carácter ingresado no es una letra o un espacio
                event.preventDefault();
                event.target.nextElementSibling.textContent = "Solo se permite Letras";
              } else {
                event.target.nextElementSibling.textContent = ""; // Reinicia el mensaje de error si se ingresa una letra o un espacio
              }
            }}
          />
          <span className="error-message" style={{ color: "red" }}></span>
        </div>
      </div>

 {/* Input para la contraseña */}
      <div className="input-container">
        <div className="flex-row">
          <input
            onChange={(event) => {
              setContraseña(event.target.value);
            }}
            name="contraseña"
            type="password"
            placeholder="Contraseña"
            className="textbox custom-input"
            maxLength={45}// Limita la longitud del input a 45 caracteres
            onKeyPress={(event) => {
              const password = event.target.value + event.key; // Agrega el carácter ingresado al valor actual del campo de contraseña
              let errorMessage = '';
              // Verifica la longitud mínima de la contraseña
              if (password.length === 0) {
                errorMessage = 'La contraseña es obligatoria';
              } else if (password.length < 8) {
                errorMessage = 'La contraseña debe tener al menos 8 caracteres';
              }
              // Verifica si la contraseña contiene al menos una letra mayúscula
              if (!/[A-Z]/.test(password)) {
                errorMessage += '\nDebe incluir al menos una letra mayúscula';
              }
              // Verifica si la contraseña contiene al menos un número
              if (!/\d/.test(password)) {
                errorMessage += '\nDebe incluir al menos un número';
              }
              // Verifica si la contraseña contiene al menos un carácter especial
              if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                errorMessage += '\nDebe incluir al menos un carácter especial';
              }
              // Muestra el mensaje de error
              document.getElementById("passwordErrorMessage").textContent = errorMessage;
            }}
          />
          <span id="passwordErrorMessage" style={{ color: "red" }}></span>


        {/* Input para el correo electronico*/}
          <input
            onChange={(event) => {
              setCorreo_Electronico(event.target.value);
            }}
            name="correo_Electronico"
            type="text"
            placeholder="Email"
            className="textbox custom-input"
            maxLength={45}
            onKeyPress={(event) => {
              const email = event.target.value + event.key;
              let errorMessage = '';
              if (!email.trim()) {
                errorMessage = 'El correo electrónico es obligatorio';
              } else if (!email.includes('@')) {
                errorMessage = 'El correo electrónico debe contener "@"';
              }
              // Muestra el mensaje de error si es necesario
              if (errorMessage) {
                document.getElementById("emailErrorMessage").textContent = errorMessage;
              } else {
                document.getElementById("emailErrorMessage").textContent = ""; // Reinicia el mensaje de error si el email es válido
              }
            }}
          />
          <span id="emailErrorMessage" style={{ color: "red" }}></span>
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
            >
              <option value="">Selecciona un Puesto</option>
              {puestos.map((puestoObject, index) => (
                <option key={index} value={puestoObject.Nombre_puesto}>
                  {puestoObject.Nombre_puesto}
                </option>
              ))}
            </select>
          </label>
          <span id="puestoErrorMessage" style={{ color: "red" }}>
            {puestoErrorMessage}
          </span>

        {/* Selección de ROL */}
          <label className="custom-label">
            Rol:
            <select
              className="inputRol custom-select"
              onChange={validarRol}
              value={selectedRol}
            >
            <option value="">Selecciona un rol</option>
              {roles.map((rolObject, index) => (
                <option key={index} value={rolObject.Rol}>
                  {rolObject.Rol}
                </option>
              ))}
            </select>
          </label>
          <span id="rolErrorMessage" style={{ color: "red" }}>
            {rolErrorMessage}
          </span>
        </div>
      </div>

{/*Creación de botones*/}

          <div className="form-buttons">
            <button id="crear" type="submit">CREAR</button>
            <span className="button-spacing"></span> {/* Espacio entre botones */}
            <button id="cancelar" type="button" onClick={cancelarCreacion}>CANCELAR</button>
          </div>  
              
    </form>
  )
}

export default NuevoUsuario;








