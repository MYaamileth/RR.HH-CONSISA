
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Componentes/Pages/Login.js';
import Inicio from './Componentes/Pages/Inicio.js';
import RecuperacionContraseña from "./Componentes/Pages/RecuperacionContraseña.js";
import MantenimientoUsuario from "./Componentes/Pages/CRUDUsuario/MantenimientoUsuario.js";
import Notificacion from "./Componentes/Pages/Notificacion.js";
import NuevoUsuario from "./Componentes/Pages/CRUDUsuario/NuevoUsuario.js";
import EditarUsuario from "./Componentes/Pages/CRUDUsuario/EditarUsuario.js";
import EliminarUsuario from "./Componentes/Pages/CRUDUsuario/EliminarUsuario.js";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Ruta por defecto */}
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/RecuperacionContraseña" element={<RecuperacionContraseña />} />
          <Route path="/MantenimientoUsuario" element={<MantenimientoUsuario />} />
          <Route path="/NuevoUsuario" element={<NuevoUsuario/>} />
          <Route path="/EditarUsuario" element={<EditarUsuario/>} />
          <Route path="/EliminarUsuario" element={<EliminarUsuario/>} />
          <Route path="/Notificacion" element={<Notificacion />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
