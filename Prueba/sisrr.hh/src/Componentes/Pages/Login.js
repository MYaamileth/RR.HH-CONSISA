/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const signUpButton = containerRef.current.querySelector("#signUp");
    const signInButton = containerRef.current.querySelector("#signIn");

    signUpButton.addEventListener("click", () => {
      containerRef.current.classList.add("right-panel-active");
      setIsSignUp(true);
    });

    signInButton.addEventListener("click", () => {
      containerRef.current.classList.remove("right-panel-active");
      setIsSignUp(false);
    });
  }, []);

  const handleRecuperacionContraseña = (e) => {
    e.preventDefault();
    navigate("/RecuperacionContraseña");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const user = e.target.querySelector('input[name="user"]').value;

    if (!user) {
      setSignInError(true);
      return;
    }

    // Validación adicional (opcional):
    if (/[a-z]/.test(user)) {
      // Mostrar mensaje de error indicando la necesidad de usar solo mayúsculas
      return;
    }

    // Aquí debes agregar la lógica de inicio de sesión
    console.log("Iniciar sesión con:", user);
    setSignInError(false); // Reinicia el estado de error después de la acción exitosa

    // Redirecciona a la página de inicio después de un inicio de sesión exitoso
    navigate("/Inicio");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const user = e.target.querySelector('input[name="user"]').value;
    if (!user) {
      setSignUpError(true);
      return;
    }
    // Aquí debes agregar la lógica de registro
    console.log("Registrar con:", user);
    setSignUpError(false); // Reinicia el estado de error después de la acción exitosa
  };

  /////

  return (
    <div
      className={`container ${isSignUp ? "right-panel-active" : ""}`}
      id="container"
      ref={containerRef}
    >
      <div className="form-container sign-in-container">
        <form action="#" onSubmit={handleSignIn}>
          <h1>Iniciar Sesión</h1>
          <span>Utilice su Nombre de Usuario</span>
          <input
            type="text"
            placeholder="Usuario"
            maxLength="15"
            name="user"
            onInput={(e) => {
              const regex = /[^a-zA-Z0-9]/g;
              e.target.value = e.target.value.toUpperCase().replace(regex, "");
            }}
            required
          />
          <span className="error-message"></span>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              maxLength="15"
              name="Contraseña"
              onChange={() => setSignUpError(false)}
              required
              style={{ width: "100%" }}
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
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
      <div className="form-container sign-up-container">
        <form action="#" onSubmit={handleSignUp}>
          <h1>{isSignUp ? "Registrar" : "Crear tu cuenta"}</h1>
          <span>Ingrese los siguientes Datos</span>
          <input
            type="text"
            placeholder="Usuario"
            maxLength="15"
            name="user"
            onInput={(e) => {
              const regex = /[^a-zA-Z0-9]/g;
              e.target.value = e.target.value.toUpperCase().replace(regex, "");
            }}
            required
          />
          <input
            type="name"
            placeholder="Nombre Completo"
            maxLength="40"
            name="Nombre Completo"
            onChange={() => setSignUpError(false)}
            onKeyPress={(e) => {
              // validacion para no poner numeros o caracteres en el campo de nombre completo

              const regex = /[^a-zA-Záéíóúñ ]/;
              const char = e.key;

              if (regex.test(char)) {
                e.preventDefault();
              }
              e.target.value = e.target.value.toUpperCase(); // validacion para convertir minusculas en mayucs
              setSignUpError(false);
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            maxLength="50"
            name="Correo"
            onChange={() => setSignUpError(false)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="Contraseña"
            maxLength="15"
            minLength="8"
            onChange={(e) => {
              const password = e.target.value;

              if (password.length < 8) {
                setSignUpError(true);
              } else {
                setSignUpError(false);
              }
            }}
            required
          />

          {signUpError && (
            <div className="error-icon">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <p>debe tener al menos 8 caracteres.</p>
            </div>
          )}

          <input
            type="password"
            placeholder="Confirmar Contraseña"
            name="Contraseña"
            maxLength="15"
            minLength="8"
            onChange={() => setSignUpError(false)}
            required
          />
          {signUpError && (
            <div className="error-icon">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
          )}
          <button type="submit">Registrar</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>¡Bienvenido Nuevamente a GRUPO CONSISA!</h1>
            <p>Inicie Sesión con su cuenta</p>
            <button className="ghost" id="signIn">
              Inicia sesión
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Bienvenido a GRUPO CONSISA</h1>
            <p>¿No tienes cuenta?</p>
            <button className="ghost" id="signUp">
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
