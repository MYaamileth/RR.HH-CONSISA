import React from 'react'
//import "./MantenimientoUsuario.css"
const NuevoUsuario = () => {
  return (
    <div>
       <div class="input-container">
            <input
              type="text"
              placeholder="Usuario"
              class="textbox custom-input"
            />
            <input
              type="text"
              placeholder="Nombre Completo"
              class="textbox custom-input"
            />
          </div>
    
          <div class="input-container">
            <div class="flex-row">
              <input
                type="text"
                placeholder="Contraseña"
                class="textbox custom-input"
              />
              <input
                type="text"
                placeholder="Email"
                class="textbox custom-input"
              />
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
                Puesto:
                <select class="inputPuesto custom-select">
                  <option value="administrador">Gerente de IT</option>
                  <option value="usuario">Administrador de BD</option>
                  <option value="agregarRol">Agregar Rol</option>
                </select>
              </label>
    
              <label  class="custom-label">
                Rol:
                <select class="inputRol custom-select">
                  <option value="administrador">Administrador</option>
                  <option value="usuario">Usuario</option>
                  <option value="agregarRol">Agregar Rol</option>
                </select>
              </label>
            </div>
          </div>
    </div>
  )
}

export default NuevoUsuario
