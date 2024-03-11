import React from 'react'
import "./nuevoUsuario.css"
const NuevoUsuario = () => {





  return (
    <form id="Formulario">
      <h1 id="Titulo">CREAR USUARIO</h1>
    <div>
       <div class="input-container">

       <div>
  <input
    type="text"
    placeholder="Usuario"
    className="textbox custom-input"
    maxLength={15} // Limita la longitud del input a 10 caracteres
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
   
 <div>    
<input
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
    
          <div class="input-container">
          <div class="flex-row">
  <input
    type="password"
    placeholder="Contraseña"
    class="textbox custom-input"
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



            
  <input
  type="text"
  placeholder="Email"
  className="textbox custom-input"
  onBlur={(event) => {
    const email = event.target.value;
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
    
          <div class="input-container">
            <div class="checkbox-container">
                  <div class="estado-container">
                    <input 
                      type="checkbox"
                      id="estado_usuario"
                      class="input"
                    />
                  </div>
                  <span class="estado-label">Activo</span>
            </div>

            <div class="flex-row">
              <label  class="custom-label">
                Puesto : 
                <select class="inputPuesto custom-select">
                  <option value="administrador">Gerente de IT</option>
                  <option value="usuario">Administrador de BD</option>
                  <option value="agregarRol">Agregar Rol</option>
                </select>
              </label>
    
              <label  class="custom-label">
                Rol : 
                <select class="inputRol custom-select">
                  <option value="administrador">Administrador</option>
                  <option value="usuario">Usuario</option>
                  <option value="agregarRol">Agregar Rol</option>
                </select>
              </label>  
              <button>Crear</button>

            
            </div>
          </div>
    </div>
    </form>
  )
}

export default NuevoUsuario
