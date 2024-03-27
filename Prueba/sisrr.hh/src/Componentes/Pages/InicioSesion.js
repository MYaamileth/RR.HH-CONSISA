// InicioSesion.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "./login.css";

const InicioSesion = () => {
  const navigate = useNavigate();

  // Valores Iniciales de los input
  const [body, setBody] = useState({ username: "", password: "" });

  // Controla lo que cambia en el input
  const inputChange = ({ target }) => {
    // Extrae constantes de la propiedad Target
    const { name, value } = target;
    setBody({
      ...body,
      [name]: value,
    });
  };

  // Enviar los valores del estado
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/login", body)
      .then(({ data }) => {
        navigate("/Inicio");
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
  };

  const [signInError, setSignInError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRecuperacionContraseña = (e) => {
    e.preventDefault();
    navigate("/RecuperacionContraseña");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const user = e.target.querySelector('input[name="username"]').value;
    // Validación de inicio de sesión
    if (!user) {
      setSignInError(true);
      return;
    }
    console.log("Iniciar sesión con:", user);
    setSignInError(false);
    navigate("/Inicio");
  };

  return (
    <div className="form-container sign-in-container">
      <form action="#" onSubmit={handleSignIn}>
        <h1>Iniciar Sesión</h1>
        <span>Utilice su Nombre de Usuario</span>
        <input
          type="text"
          placeholder="USUARIO"
          maxLength="15"
          required
          onInput={(e) => {
            const regex = /[^a-zA-Z0-9]/g;
            e.target.value = e.target.value.toUpperCase().replace(regex, "");
          }}
          value={body.username}
          onChange={inputChange}
          name="username"
        />
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="CONTRASEÑA"
            maxLength="15"
            required
            style={{ width: "100%" }}
            value={body.password}
            onChange={inputChange}
            name="password"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={() => setShowPassword(!showPassword)}
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
        {signInError && (
          <div className="error-icon">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </div>
        )}
        <a href="#" onClick={handleRecuperacionContraseña}>
          ¿Olvidó su contraseña?
        </a>
        <button type="submit" onClick={onSubmit}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default InicioSesion;
