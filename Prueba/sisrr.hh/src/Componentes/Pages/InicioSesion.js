import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "./login.css";

const InicioSesion = () => {
  const navigate = useNavigate();

  // Valores Iniciales de los inputs
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(null); // Nuevo estado para manejar errores

  // Controla lo que cambia en el input de usuario
  const handleUsuarioChange = (e) => {
    const { value } = e.target;
    setUsuario(value.toUpperCase().replace(/[^a-zA-Z0-9]/g, ""));
  };

  // Controla lo que cambia en el input de contraseña
  const handleContraseñaChange = (e) => {
    const { value } = e.target;
    setContraseña(value);
  };

  // Enviar los valores del estado al servidor para iniciar sesión
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/iniciodesesio/iniciarSesion", { Usuario: usuario, Contraseña: contraseña })
      .then(({ data }) => {
        // Si la solicitud es exitosa, redirige al usuario a la página de inicio
        navigate("/Inicio");
      })
      .catch(({ response }) => {
        // Si hay un error en la solicitud, muestra un mensaje de error
        setError("Usuario o contraseña incorrectos");
      });
  };

  // Estado para manejar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
        <span>Utilice su Nombre de Usuario</span>
        <input
          type="text"
          placeholder="USUARIO"
          maxLength="15"
          required
          value={usuario}
          onChange={handleUsuarioChange}
        />
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="CONTRASEÑA"
            maxLength="15"
            required
            style={{ width: "100%" }}
            value={contraseña}
            onChange={handleContraseñaChange}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={() => setShowPassword(!showPassword)} // Cambia la visibilidad de la contraseña
            className="eye-icon"
            style={{
              color: "#7f24f5",
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        </div>
        {error && (
          <div className="error-message">
            <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
          </div>
        )}
        <a href="#" onClick={() => navigate("/RecuperacionContraseña")}>
          ¿Olvidó su contraseña?
        </a>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default InicioSesion;
