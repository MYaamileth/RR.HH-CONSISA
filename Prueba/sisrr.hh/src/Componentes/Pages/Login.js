import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './login.css';

const Login = () => {
  const containerRef = useRef(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  useEffect(() => {
    const signUpButton = containerRef.current.querySelector('#signUp');
    const signInButton = containerRef.current.querySelector('#signIn');

    signUpButton.addEventListener('click', () => {
      containerRef.current.classList.add('right-panel-active');
      setIsSignUp(true);
    });

    signInButton.addEventListener('click', () => {
      containerRef.current.classList.remove('right-panel-active');
      setIsSignUp(false);
    });
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    const user = e.target.querySelector('input[name="user"]').value;
    if (!user) {
      setSignInError(true);
      return;
    }
    // Aquí debes agregar la lógica de inicio de sesión
    console.log('Iniciar sesión con:', user);
    setSignInError(false); // Reinicia el estado de error después de la acción exitosa
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const user = e.target.querySelector('input[name="user"]').value;
    if (!user) {
      setSignUpError(true);
      return;
    }
    // Aquí debes agregar la lógica de registro
    console.log('Registrar con:', user);
    setSignUpError(false); // Reinicia el estado de error después de la acción exitosa
  };

  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container" ref={containerRef}>
      <div className="form-container sign-in-container">
        <form action="#" onSubmit={handleSignIn}>
          <h1>Iniciar Sesión</h1>
          <span>Utilice su Nombre de Usuario</span>
          <input type="text" placeholder="Usuario" name="user" onChange={() => setSignInError(false)} required />
          <input type="password" placeholder="Contraseña" name="Contraseña" onChange={() => setSignUpError(false)} required />
          {signInError && (
            <div className="error-icon">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
          )}
          <a href="#">¿Olvidó su contraseña?</a>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
      <div className="form-container sign-up-container">
        <form action="#" onSubmit={handleSignUp}>
          <h1>{isSignUp ? 'Registrar' : 'Crear tu cuenta'}</h1>
          <span>Ingrese los siguientes Datos</span>
          <input type="text" placeholder="Usuario" name="user" onChange={() => setSignUpError(false)} required />
          <input type="name" placeholder="Nombre Completo" name="Nombre Completo" onChange={() => setSignUpError(false)} required />
          <input type="email" placeholder="Email" name="Correo" onChange={() => setSignUpError(false)} required />
          <input type="password" placeholder="Contraseña" name="Contraseña" onChange={() => setSignUpError(false)} required />
          <input type="password" placeholder="Confirmar Contraseña" name="Contraseña" onChange={() => setSignUpError(false)} required />
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
            <button className="ghost" id="signIn">Inicia sesión</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Bienvenido a GRUPO CONSISA</h1>
            <p>¿No tienes cuenta?</p>
            <button className="ghost" id="signUp">Registrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
