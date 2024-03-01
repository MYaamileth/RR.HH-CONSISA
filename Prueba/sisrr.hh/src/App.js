import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Componentes/Pages/Login.js';
import Inicio from './Componentes/Pages/Inicio.js';
import RecuperacionContraseña from "./Componentes/Pages/RecuperacionContraseña.js";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Ruta por defecto */}
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/RecuperacionContraseña" element={<RecuperacionContraseña />} />
         

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
