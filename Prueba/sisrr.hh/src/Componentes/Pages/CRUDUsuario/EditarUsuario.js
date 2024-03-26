import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./editarUsuario.css";

const EditarUsuario = ({ onClose, Id_usuario }) => {
  //Se definio el estado en grupo
  const [usuarioInfo, setUsuario] = useState({
    Id_Estado: "",
    Id_Rol: "",
    Id_Puesto: "",
    Usuario: "",
    Nombre_Completo_Usuario: "",
    Contraseña: "",
    Correo_electronico: "",
  });
  //VARIABLES DE ESTADO Y MANEJO DE MENSAJES DE ERRORRES DE LOS COMBOBOX
  const [roles, setRoles] = useState([]);
  const [puestos, setPuestos] = useState([]);

  const [selectedRol, setSelectedRol] = useState("");
  const [rolErrorMessage, setRolErrorMessage] = useState("");

  const [selectedPuesto, setSelectedPuesto] = useState("");
  const [puestoErrorMessage, setPuestoErrorMessage] = useState("");

  const [idPuesto, setIdPuesto] = useState("");
  const [idRol, setIdRol] = useState("");
  
  // Cambia el estado entre activo (1) e inactivo (0)
  const toggleEstado = () => {
    setUsuario((prevUsuarioInfo) => ({
      ...prevUsuarioInfo,
      Id_Estado: prevUsuarioInfo.Id_Estado === "1" ? "0" : "1",
    }));
  };
  // Método para obtener el ID del puesto seleccionado
  const obtenerIdPuesto = (nombrePuesto) => {
    const puestoSeleccionado = puestos.find(
      (puesto) => puesto.Nombre_puesto === nombrePuesto
    );
    return puestoSeleccionado ? puestoSeleccionado.Id_Puesto : null;
  };
  
  const obtenerIdRol = (nombreRol) => {
    const rolSeleccionado = roles.find((roles) => roles.Rol === nombreRol);
    return rolSeleccionado ? rolSeleccionado.Id_Rol : null;
  };

  //VALIDACIONES DE SELECCION DE COMBOBOX
  const validarPuesto = (event) => {
    const selectedOption = event.target.value;
    const errorMessage = selectedOption ? "" : "Debes seleccionar un Puesto";
    setPuestoErrorMessage(errorMessage);
    setSelectedPuesto(selectedOption);
    setUsuario((prevUsuarioInfo) => ({
      ...prevUsuarioInfo,
      Id_Puesto: selectedOption ? obtenerIdPuesto(selectedOption) : "",
    }));
  };
  const validarRol = (event) => {
    const selectedOption = event.target.value;
    const errorMessage = selectedOption ? "" : "Debes seleccionar un Rol";
    setRolErrorMessage(errorMessage);
    setSelectedRol(selectedOption);
    setUsuario((prevUsuarioInfo) => ({
      ...prevUsuarioInfo,
      Id_Rol: selectedOption ? obtenerIdRol(selectedOption) : "",
    }));
  };
 
  //funcion para obtener la informacion/registros del id enviado como parametro.
  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/idUsuario/${Id_usuario}`
        );
        const data = await response.json();
        // Actualizar el estado con los datos del usuario obtenidos de la API
        setUsuario(data);
        //Conversion y adquisicion de los datos del combobox a string para insertarlos en los combobox correspondiente
        setIdPuesto(data.Id_Puesto.toString());
        setIdRol(data.Id_Rol.toString());

        // Obtener el nombre del puesto y del rol para establecerlos como seleccionados
        const puestoSeleccionado = puestos.find(
          (puesto) => puesto.Id_Puesto === data.Id_Puesto
        );
        const rolSeleccionado = roles.find((rol) => rol.Id_Rol === data.Id_Rol);

        if (puestoSeleccionado) {
          setSelectedPuesto(puestoSeleccionado.Nombre_puesto);
        }

        if (rolSeleccionado) {
          setSelectedRol(rolSeleccionado.Rol);
        }
      } catch (error) {
        console.error(
          "Error al obtener la información del usuario:",
          error.message
        );
      }
    };
    obtenerUsuario();
  }, [Id_usuario, puestos, roles]);

  const editarUsuario = async (event) => {
    event.preventDefault();
    try {
      // Alerta de confirmación antes de la edición
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas editar el registro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, editar",
        cancelButtonText: "Cancelar",
      });

      if (confirmacion.isConfirmed) {
        const response = await fetch(
          `http://localhost:3001/editarUsuario/${Id_usuario}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioInfo),
          }
        );

        if (response.ok) {
          // Alerta de éxito después de la edición
          Swal.fire({
            title: "¡Éxito!",
            text: "El usuario ha sido editado exitosamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        } else {
          throw new Error("Error en la solicitud");
        }
      }
    } catch (error) {
      console.error("Error al editar el usuario:", error.message);
      alert("Error al editar el usuario");
    }
  };

  //Use effect con la unica funcion de traer los puestos y roles de la BD
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

  //Hasta el momento se mantiene el boton de cancelar solo unicamente para cerrar la pantalla de Editar Usuario
  const cancelarEdicion = () => {
    //cierra el formulario-------
    onClose();
  };

  //funcion creada para manejar el cambio de valor en los inputs.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={editarUsuario} className="Editar">
      <h1>EDITAR USUARIO</h1>
      <div className="input-container">
        <div className="input-group">
          <input
            name="Usuario"
            type="text"
            value={usuarioInfo.Usuario} // Asignar el valor del usuario al input
            placeholder="Usuario"
            className="textbox custom-input"
            onChange={handleChange}
            maxLength={15}
            required
          />

          <input
            name="Nombre_Completo_Usuario"
            type="text"
            value={usuarioInfo.Nombre_Completo_Usuario} // Asignar el valor del nombre completo al input
            placeholder="Nombre Completo"
            className="textbox custom-input"
            onChange={handleChange}
            maxLength={40}
            required
          />
        </div>
      </div>
      <div className="input-container">
        <div className="flex-row">
          <input
            name="Contraseña"
            type="password"
            placeholder="Contraseña"
            className="textbox custom-input"
            value={usuarioInfo.Contraseña}
            onChange={handleChange}
            maxLength={20}
            minLength={8}
            required
          />
          <input
            name="Correo_electronico"
            type="text"
            placeholder="Email"
            className="textbox custom-input"
            value={usuarioInfo.Correo_electronico}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="input-container">
        <div className="checkbox-container">
          <div className="estado-container">
            <input
              name="estados"
              type="checkbox"
              id="estado_usuario"
              className="input"
              onClick={toggleEstado}
              checked={usuarioInfo.Id_Estado === "1" ? true : false} // Marcado si Id_Estado es "1"
            />
          </div>
          <span className="estado-label">Activo</span>
        </div>
      </div>

      <div className="input-container">
        {/* Selección de PUESTO */}
        <div className="flex-row">
          <label className="custom-label">
            Puesto:
            <select
              name="Puesto"
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

          {/* Selección de ROL */}
          <label className="custom-label">
            Rol:
            <select
              name="Rol"
              className="inputRol custom-select"
              value={selectedRol}
              onChange={validarRol}
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
      <div className="form-buttons-editar">
        <button id="editar" type="submit">
          EDITAR
        </button>
        <span className="button-spacing"></span>
        <button id="cancelar" type="button" onClick={cancelarEdicion}>
          CANCELAR
        </button>
      </div>
    </form>
  );
};

export default EditarUsuario;
