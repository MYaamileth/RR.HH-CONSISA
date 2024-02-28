import react from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Componentes/Pages/Login.js';

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />//PONGO LA RUTA DEL LOGIN ASI, PARA QUE APAREZCA EN EL BUSCADOS EL NOMBRES DEL MISMO
        </Routes>
    </BrowserRouter>
    </>
   
    
  );
}

export default App;
