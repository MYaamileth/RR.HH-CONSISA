import React, {  useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './recuperacionContraseña.css'


function RecuperacionContraseña() {
  const [correo, setCorreo] = useState(''); // Estado para almacenar el valor del correo electrónico
  const [correoError, setCorreoError] = useState(false); // Estado para controlar si hay un error en el campo de correo electrónico




  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que se recargue la página al enviar el formulario
    if (!correo.trim()) {
      // Verifica si el campo de correo está vacío o solo contiene espacios en blanco
      setCorreoError(true); // Activa el estado de error si el campo está vacío
      return;
    }
    // Aquí agregarías la lógica para enviar la solicitud de recuperación de contraseña
    console.log('Correo electrónico:', correo);
    // Limpia el campo de correo después de enviar el formulario
    setCorreo('');
    setCorreoError(false); // Reinicia el estado de error después de una acción exitosa
  };

  return (
    <div className="formulario">
      <h1>Recuperación de Contraseña</h1>
      <p>Ingrese su correo electrónico para recibir notificación:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => {
            setCorreo(e.target.value);
            setCorreoError(false); // Reinicia el estado de error al escribir en el input
          } } />
        {/* Muestra el icono de advertencia si hay un error en el campo de correo electrónico */}
        {correoError && (
          <div className="error-icon">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </div>
        )}
        <br />
        <button type="submit" className="btn success">
          Recuperar
        </button>
      </form>
    </div>
  );
}

export default RecuperacionContraseña;
