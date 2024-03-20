import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';



const EditarUsuario = ({ onClose, Id_usuario }) => {
  //Se definio el estado en grupo
  const [usuarioInfo, setUsuario] = useState({
    Usuario: "",
    Nombre_Completo_Usuario: "",
    Contraseña: "",
    Correo_electronico: "",

  });
//definicion de useState individual
  // SELECCION DE PUESTO DE USUARIO
  const [selectedPuesto, setSelectedPuesto] = useState("");
  const [puestoErrorMessage, setPuestoErrorMessage] = useState("");
  const [puestos, setPuestos] = useState([]);
  const [idPuesto, setIdPuesto] = useState("");
  
  
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

//use effect cuyo funcionamiento es de traer los puestos que hay en la bd
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





//funcion para obtener la informacion/registros del id enviado como parametro.
  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:3001/idUsuario/${Id_usuario}`);
        const data = await response.json();
        // Actualizar el estado con los datos del usuario obtenidos de la API
        setUsuario(data);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error.message);

      }
    };
    obtenerUsuario();
  }, [Id_usuario]);

  const editarUsuario = async (event) => {
    event.preventDefault();
    try {
      // Alerta de confirmación antes de la edición
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas editar el registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, editar',
        cancelButtonText: 'Cancelar'
      });
      
      if (confirmacion.isConfirmed) {
        const response = await fetch(`http://localhost:3001/editarUsuario/${Id_usuario}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(usuarioInfo)
        });
  
        if (response.ok) {
          // Alerta de éxito después de la edición
          Swal.fire({
            title: '¡Éxito!',
            text: 'El usuario ha sido editado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          throw new Error("Error en la solicitud");
        }
      }
    } catch (error) {
      console.error("Error al editar el usuario:", error.message);
      alert("Error al registrar el usuario");
    }
  };
  
  
  //Hasta el momento se mantiene el boton de cancelar solo unicamente para cerrar la pantalla de Editar Usuario
  const cancelarEdicion = () => {
    //cierra el formulario-------
    onClose();
  };


  //funcion creada para manejar el cambio de valor en los inputs.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsuario(prevState => ({
      ...prevState,
      [name]: value
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
          />
        </div>
        <div className="input-group">
          <input
            name="Nombre_Completo_Usuario"
            type="text"
            value={usuarioInfo.Nombre_Completo_Usuario} // Asignar el valor del nombre completo al input
            placeholder="Nombre Completo"
            className="textbox custom-input"
            onChange={handleChange}
            maxLength={40}
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
            maxLength={45}
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



          {/* Selección de ROL */}
          <label className="custom-label">
            Rol:
            <select
              name="Id_rol"
              className="inputRol custom-select"
             // value={usuarioInfo.Id_rol}
            //  onChange={handleChange}
            >
              <option value="">Selecciona un rol</option>
              {/* Opciones para seleccionar un rol */}
            </select>
          </label>
        </div>
      </div>
      <div className="form-buttons">
        <button id="crear" type="submit" onClick={editarUsuario}>EDITAR</button>
        <span className="button-spacing"></span>
        <button id="cancelar" type="button" onClick={cancelarEdicion}>CANCELAR</button>
      </div>
    </form>
  );
};

export default EditarUsuario;
