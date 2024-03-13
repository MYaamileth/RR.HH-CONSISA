import "./nuevoUsuario.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

// Componente funcional EditarUsuario
const NuevoUsuario = () => {

  // Función para sumar días a una fecha
  function sumarDias(fecha, dias) {
    if (!fecha) return null; // Manejar el caso de fecha indefinida
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    return nuevaFecha;
  }
  
  function obtenerFechaVencimiento(fechaPrimerIngreso) {
    const fechaVencimiento = sumarDias(fechaPrimerIngreso, 40); // Función `sumarDias` no definida. Debes implementarla o usar una biblioteca para sumar días a una fecha.
    return fechaVencimiento.toISOString().substring(0, 19);
  }

  // Función para obtener la fecha actual
  function obtenerFechaActual() {
    return new Date().toISOString().substring(0, 19);
  }
  
  // Función para calcular la fecha de vencimiento
  function calcularFechaVencimiento(fechaPrimerIngreso) {
    const fechaVencimiento = sumarDias(fechaPrimerIngreso, 40);
    if (!fechaVencimiento) return null; // Manejar el caso de fecha indefinida
    return fechaVencimiento.toISOString().substring(0, 19);
  }
  
  // Función para obtener la fecha de la primera sesión
  function obtenerFechaPrimerSesion() {
    const fechaPrimerSesion = localStorage.getItem("fechaPrimerSesion");
    if (fechaPrimerSesion) {
      return fechaPrimerSesion;
    } else {
      const fechaActual = new Date();
      localStorage.setItem("fechaPrimerSesion", fechaActual.toISOString().substring(0, 19));
      return fechaActual.toISOString().substring(0, 19);
    }
  }
  
  // Función para actualizar la fecha de la primera sesión
  function actualizarFechaPrimerSesion() {
    const fechaVencimiento = obtenerFechaVencimiento(obtenerFechaPrimerSesion());
    const fechaActual = new Date();
    if (fechaActual > fechaVencimiento) {
      localStorage.setItem("fechaPrimerSesion", fechaActual.toISOString().substring(0, 19));
    }
  }

  // Variable de estado para indicar si se está cargando la información
    const [estado, setEstado] = useState("");
    const [roles, setRoles] = useState("");
    const [puesto, setPuesto] = useState("");
    const [usuario, setUsuario] = useState("");
    const [nombreCompletoUsuario, setNombreCompletoUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const fechaUltimaConexion = obtenerFechaActual();
    const [primer_Ingreso, setPimerIngreso] = useState("");
    const [correo_Electronico, setCorreo_Electronico] = useState("");
    const fechaVencimiento = calcularFechaVencimiento(primer_Ingreso);
    const [creado_Por, setCreado_Por] = useState("");
    const [modificado_Por, setModificado_Por] = useState("");
    const [fecha_Creacion, setFecha_Creacion] = useState("");
    const [fecha_Modificacion, setFecha_Modificacion] = useState("");

     //Funcion para envio de valores capturados por los campos del frontend
    const creacionUsuario =()=>{
    axios.post("http://localhost:3001/creacionUsuario", {
   

      //LOS CAMPOS ANTERIORES DESPUES DE DEBEN ELIMINAR DESPUES
      Id_Estado: estado,
      Id_rol: roles,
      Id_puesto: puesto,
      Usuario: usuario,
      Nombre_Completo_Usuario: nombreCompletoUsuario,
      Contraseña: contraseña,
      Fecha_Ultima_Conexion: fechaUltimaConexion,//calculado en el sistema
      Primer_ingreso: primer_Ingreso,
      Correo_electronico: correo_Electronico,
      Fecha_vencimiento: fechaVencimiento,//calculado en el sistema
      Creado_por: creado_Por,
      Modificado_por: modificado_Por,
      Fecha_creacion: fecha_Creacion,
      Fecha_modificacion: fecha_Modificacion
    
    }). then(()=> {
      //traerUsuarios(); //cada que se guarde un usuario se enlistara en la tabla
      
      //alert("Usuario registrado")
    });
  }

  return (
    // Formulario de edición de usuario
    <form Formulario-Crear ="true" className="Crear">
      <h1 id="Titulo">CREAR USUARIO</h1>
    
      {/* Contenedor de inputs */}
        <div className="input-container">

        {/* Input para el nombre de usuario */}
        <div>
          <input
            onChange={(event)=>{
              setUsuario(event.target.value);
            }}
            type="text"
            placeholder="Usuario"
            className="textbox custom-input"
            maxLength={15} // Limita la longitud del input a 15 caracteres
            onKeyPress={(event) => {
              const char = event.key;
              const inputValue = event.target.value.toUpperCase();

              if (!/[A-Z]/.test(char)) {
                event.preventDefault();
                document.getElementById("errorMessage").textContent = "Solo se permiten mayúsculas";
              } else if (inputValue.length >= 15) {
                event.preventDefault();
                document.getElementById("errorMessage").textContent = "Máximo de caracteres alcanzados";
              } else {
                document.getElementById("errorMessage").textContent = ""; // Reinicia el mensaje de error si se ingresa una mayúscula
              }
            }}
          />
          <span id="errorMessage" style={{ color: "red" }}></span>
        </div>
        {/* Input para el nombre completo */}
        <div>
          <input
            onChange={(event)=>{
              setNombreCompletoUsuario(event.target.value);
            }}
            type="text"
            placeholder="Nombre Completo"
            className="textbox custom-input"
            maxLength={40} // Limita la longitud del input a 40 caracteres
            onKeyPress={(event) => {
              const char = event.key;

              if (!/[a-zA-Z\s]/.test(char)) { // Verifica si el carácter ingresado no es una letra o un espacio
                event.preventDefault();
                document.getElementById("errorMessage").textContent = "Solo se permite Letras";
              } else {
                document.getElementById("errorMessage").textContent = ""; // Reinicia el mensaje de error si se ingresa una letra o un espacio
              }
            }}
          />
          <span id="errorMessage" style={{ color: "red" }}></span>
        </div>
      </div>

      {/* Otro contenedor de inputs */}
      <div className="input-container">
        <div className="flex-row">

          {/* Input para la contraseña */}
          <input
             onChange={(event)=>{
              setContraseña(event.target.value);
            }}
            type="password"
            placeholder="Contraseña"
            className="textbox custom-input"
            maxLength={45} // Limita la longitud del input a 45 caracteres
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

          {/* Input para el correo electrónico */}
          <input
            onChange={(event)=>{
              setCorreo_Electronico(event.target.value);
            }}
            type="text"
            placeholder="Email"
            className="textbox custom-input"
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
        <div className="checkbox-container">
          <div className="estado-container">
            {/* Checkbox para el estado del usuario */}
            <input
              type="checkbox"
              id="estado_usuario"
              className="input"
              onClick={(event) => {
                const isChecked = event.target.checked;
                let errorMessage = '';

                if (!isChecked) {
                  errorMessage = 'Debes seleccionar el estado del usuario';
                }
                // Muestra el mensaje de error si es necesario
                if (errorMessage) {
                  document.getElementById("estadoUsuarioErrorMessage").textContent = errorMessage;
                } else {
                  document.getElementById("estadoUsuarioErrorMessage").textContent = ""; // Reinicia el mensaje de error si el estado del usuario es válido
                }
              }}
            />
            <span id="estadoUsuarioErrorMessage" style={{ color: "red" }}></span>
          </div>
          <span className="estado-label">Activo</span>
        </div>

        {/* Selección de Puesto */}
        <div className="flex-row">
        <label className="custom-label">
            Puesto:
          <select className="inputPuesto custom-select" onBlur={(event) => {
            const selectedOption = event.target.value;
            let errorMessage = '';

            if (!selectedOption) {
              errorMessage = 'Debes seleccionar una opción de Puesto';
            }

            // Muestra el mensaje de error si es necesario
            if (errorMessage) {
              document.getElementById("puestoErrorMessage").textContent = errorMessage;
            } else {
              document.getElementById("puestoErrorMessage").textContent = ""; // Reinicia el mensaje de error si se ha seleccionado una opción válida
            }
          }}>
            <option value="">Selecciona un puesto</option>
            <option value="administrador">Gerente de IT</option>
            <option value="usuario">Administrador de BD</option>
            <option value="agregarRol">Agregar Rol</option>
          </select>
          </label>
          
          <span id="puestoErrorMessage" style={{ color: "red" }}></span>

          {/* Selección de Rol */}
          <label className="custom-label">
            Rol :
            <select className="inputRol custom-select" onBlur={(event) => {
              const selectedOption = event.target.value;
              let errorMessage = '';

              if (!selectedOption) {
                errorMessage = 'Debes seleccionar una opción de Rol';
              }

              // Muestra el mensaje de error si es necesario
              if (errorMessage) {
                document.getElementById("rolErrorMessage").textContent = errorMessage;
              } else {
                document.getElementById("rolErrorMessage").textContent = ""; // Reinicia el mensaje de error si se ha seleccionado una opción válida
              }
            }}>
              <option value="">Selecciona un rol</option>
              <option value="administrador">Administrador</option>
              <option value="usuario">Usuario</option>
              <option value="agregarRol">Agregar Rol</option>
            </select>
          </label>
          <span id="rolErrorMessage" style={{ color: "red" }}></span>

        </div>
      </div>

        <div className="form-buttons">
            <button id="crear">CREAR</button>
            
            <button id="cancelar">CANCELAR</button>
          </div>
          
    </form>
  )
}

export default NuevoUsuario;