import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "./login.css";

const Registro = () => {
  const [signUpError, setSignUpError] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const user = e.target.querySelector('input[name="user"]').value;
    const fullName = e.target.querySelector('input[name="fullName"]').value;
    const email = e.target.querySelector('input[name="email"]').value;
    const password = e.target.querySelector('input[name="password"]').value;
    const confirmPassword = e.target.querySelector('input[name="confirmPassword"]').value;

    // Validaciones
    if (!user || !fullName || !email || !password || !confirmPassword) {
      setEmptyFieldError(true);
      return;
    } else {
      setEmptyFieldError(false);
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    } else {
      setConfirmPasswordError(false);
    }

    // Agregar lógica de registro aquí
    console.log("Registrar con:", user, fullName, email, password);
    setSignUpError(false); // Reinicia el estado de error después de la acción exitosa
  };

  return (
    <div className="form-container sign-up-container">
      <form action="#" onSubmit={handleSignUp}>
        <h1>Registrar</h1>
        <span>Ingrese los siguientes Datos</span>
        <input
          type="text"
          placeholder="USUARIO"
          maxLength="15"
          name="user"
          required
          onInput={(e) => {
            const regex = /[^a-zA-Z0-9]/g;
            e.target.value = e.target.value.toUpperCase().replace(regex, "");
          }}
        />
        <input
          type="text"
          placeholder="Nombre Completo"
          maxLength="40"
          name="fullName"
          required
          onKeyPress={(e) => {
            const regex = /[0-9]/;
            if (regex.test(e.key)) {
              e.preventDefault();
            }
          }}
          style={{ textTransform: "uppercase" }} // Convertir a mayúsculas
        />
        <input
          type="email"
          placeholder="EMAIL"
          maxLength="50"
          name="email"
          required
        />
        <div className="input-container">
          <input
            type="password"
            placeholder="CONTRASEÑA"
            name="password"
            maxLength="15"
            minLength="8"
            required
            style={{ paddingRight: "100px", marginBottom: "0px", marginTop: "0px" }} // Ajustar el espacio para el icono y los márgenes superior e inferior
          />
          {passwordError && (
            <div className="error-popup">
              <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
              <p>La contraseña debe contener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una minúscula, un número y un carácter especial.</p>
            </div>
          )}
        </div>
        <input
          type="password"
          placeholder="CONFIRMAR CONTRASEÑA"
          name="confirmPassword"
          maxLength="15"
          minLength="8"
          required
        />
        {confirmPasswordError && (
          <div className="error-popup">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <p>Las contraseñas no coinciden.</p>
          </div>
        )}
        {emptyFieldError && (
          <div className="error-popup">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <p>¡Campo Obligatorio!</p>
          </div>
        )}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Registro;
