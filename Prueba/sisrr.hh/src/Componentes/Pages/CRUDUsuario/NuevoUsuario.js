
import React, { useState, useEffect } from "react";
import "./nuevoUsuario.css";

const NuevoUsuario = () => {
  const [estado, setEstado] = useState("");
  const [roles, setRoles] = useState([]);
  const [puestos, setPuestos] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [nombreCompletoUsuario, setNombreCompletoUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [primerIngreso, setPrimerIngreso] = useState("");
  const [correo_Electronico, setCorreo_Electronico] = useState("");
  const [fechaUltimaConexion, setFechaUltimaConexion] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [token, setToken] = useState("");
  //SELECCION DE ROL DE USUARIO
  const [selectedRol, setSelectedRol] = useState("");
  const [rolErrorMessage, setRolErrorMessage] = useState("");
  // SELECCION DE PUESTO DE USUARIO
  const [selectedPuesto, setSelectedPuesto] = useState("");
  const [puestoErrorMessage, setPuestoErrorMessage] = useState("");
  const [creado_Por, setCreadoPor] = useState("");
  const [modificado_Por, setModificadoPor] = useState("");
  const [fecha_Creacion, setFechaCreacion] = useState("");
  const [fecha_Modificacion, setFechaModificacion] = useState("");
  const toggleEstado=()=>{
     // Cambia el estado entre activo (1) e inactivo (0)
     setEstado((prevEstado) => (prevEstado === 1 ? 0 : 1));
  }

  //METODO PARA OBTENER LOS ROLES DIRECTO DEL BACKEND(LO MISMO SERIA PARA EL CAMPO PUESTO SI FUNCIONARA)
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
  //valida que el usuario seleccione un rol en el combobox(lo mismo seria para el puesto si funcionara)
  const validarRol = (event) => {
    const selectedOption = event.target.value;
    let errorMessage = "";

    if (!selectedOption) {
      errorMessage = "Debes seleccionar una opción de Rol";
    }

    setRolErrorMessage(errorMessage);
    setSelectedRol(selectedOption);//Manda la opción seleccionada por el usuario a las variables de entorno
  };

//NO LA BORRE A MENOS QUE PONGAN UNA QUE SI FUNCIOE
  //VALIDACION PARA INTENTAR GUARDAR EL PUESTO(NO SIRVE, PERO TOMEN IDEA DE COMO MOMENTANEAMETNE SE PUE IR HACIENDO)
  const handlePuestoChange = (event) => {
    let selectedOption = event.target.value;
    setSelectedPuesto(selectedOption); // Actualiza el valor seleccionado

    let errorMessage = '';

    switch(selectedOption) {
      case '':
        errorMessage = 'Debes seleccionar una opción de Puesto';
        break;
      case '1':
        selectedOption= "Desarrollador de software";
        break;
      case '2':
        selectedOption= "Ingeniero de redes";
        break;
      case '3':
        selectedOption= "Analista de seguridad de la información";
        break;
      default:
        errorMessage = '';
        // Actualiza la variable de estado de puestos
        setPuestos(prevPuestos => [...prevPuestos, selectedOption]);
      }

    setPuestoErrorMessage(errorMessage); // Actualiza el mensaje de error
  };

  const creacionUsuario = async (event) => {
    event.preventDefault();
    //LAS VARIBALES DEFINIDAS ACA SE DEBRIAN DE LLAMAR ABAJO, EN VEZ DE LOS UNOS QUE MANUALMENTE INSERTE
    //PERO COMO NO FUNCIONA LA PARTE DE CONVERTIR, MEJOR NO LAS USE. LA PARTE DE TRAER DATOS DEL CAMPOS ROL SI SIRVEN
    const idRolSeleccionado = roles.find((rol) => rol.Rol === selectedRol)?.Id_Rol;
    const idPuestoSeleccionado = puestos.find((puesto) => puesto.Puesto === selectedPuesto)?.Id_puesto;

    try {
      const response = await fetch("http://localhost:3001/creacionUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id_estado: estado,
          Id_rol: "1",
          Id_Puesto: "1",
          Id_empleado: "1",
          Usuario: usuario,
          Nombre_Completo_Usuario: nombreCompletoUsuario,
          Contraseña: contraseña,
          Primer_ingreso: "2024-03-16", //primerIngreso,
          Fecha_ultima_conexion: "2024-03-16", //fechaUltimaConexion,
          Correo_electronico: correo_Electronico,
          Fecha_vencimiento: "2024-04-16",//fechaVencimiento,
          Token: "58923",//token,
          Creado_por: "Marilyn Mejia", //creado_Por,
          Modificado_por: "Marilyn Mejia",//modificado_Por,
          Fecha_creacion: "2024-03-16",//fecha_Creacion,
          Fecha_modificacion: "2024-03-16",//fecha_Modificacion,
        }),
      });//Respuesta del api
      const data = await response.json();
      alert("Usuario registrado");
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      // Manejar errores de la llamada a la API
      if (error.response) {
        // El servidor respondió con un código de error
        console.error("Error en la solicitud:", error.response.status);
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        console.error("No se recibió respuesta del servidor");
      } else {
        // Se produjo un error al configurar la solicitud
        console.error("Error al configurar la solicitud:", error.message);
    }
    }
  };




  return (
    <form onSubmit={creacionUsuario}className="Crear">
      <h1 id="Titulo">CREAR USUARIO</h1>
            
        {/* Contenedor principal */}
        <div className="input-container">

        {/* Contenedor para el USUARIO */}
        <div className="input-group">
          <input  onChange={(event) => { setUsuario(event.target.value); }}
            name="usuario"
            type="text"
            placeholder="Usuario"
            className="textbox custom-input"
            maxLength={15} // Limita la longitud del input a 15 caracteres
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

        {/* Contenedor para el NOMBRE COMPLETO*/}
        <div className="input-group">
          <input  onChange={(event) => { setNombreCompletoUsuario(event.target.value); }}
            name="nombreCompletoUsuario"
            type="text"
            placeholder="Nombre Completo"
            className="textbox custom-input"
            maxLength={40} // Limita la longitud del input a 40 caracteres
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



      {/* Otro contenedor de inputs */}
      <div className="input-container">
        <div className="flex-row">

          {/* Input para la CONTRASEÑA */}
          <input onChange={(event)=>{ setContraseña(event.target.value); /*ESTO MANDA A LAS VARIABLES DE ENTORNO Y ESTA EN TODOS LOS CAMPOS */}} 
            name="contraseña"
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

          {/* Input para el CORREO ELECTRONICO*/}
          <input   onChange={(event) => { setCorreo_Electronico(event.target.value); }}
            name="correo_Electronico"
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
            {/* Checkbox para el ESTADO DE USUARIO*/}
            <input
              name="estados"
              type="checkbox"
              id="estado_usuario"
              className="input"
              onClick={toggleEstado} // Cambia el estado al hacer clic en el checkbox
            />
            <span id="estadoUsuarioErrorMessage" style={{ color: "red" }}></span>
          </div>
          <span className="estado-label">Activo</span>
        </div>
        {/* Selección de PUESTO */}
        <div className="flex-row">
        <label className="custom-label">
            Puesto:
            <select className="inputPuesto custom-select" value={selectedPuesto}
              onChange={handlePuestoChange}
            >
              <option value="">Selecciona un puesto</option>
              <option value="1">Gerente de IT</option>
              <option value="2">Administrador de BD</option>
              <option value="3">Agregar Rol</option>
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

            <div className="form-buttons">
                <button id="crear" type="submit" >CREAR</button>
                
                <button id="cancelar"  type="button">CANCELAR</button>
              </div>
              
    </form>
  )
}

export default NuevoUsuario;







