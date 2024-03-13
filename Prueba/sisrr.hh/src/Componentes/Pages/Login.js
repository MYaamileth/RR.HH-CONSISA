import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Simulación de base de datos de usuarios
  const [usersDatabase, setUsersDatabase] = useState([
    { user: 'kj', email: 'admin@example.com', password: '1234consisa', fullName: 'Admin', state: 'active', role: 'admin' }
  ]);

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

  const handleRecuperacionContraseña = (e) => {
    e.preventDefault();
    navigate('/Notificacion');
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const user = e.target.querySelector('input[name="user"]').value;
    const password = e.target.querySelector('input[name="Contraseña"]').value;

    const foundUser = usersDatabase.find(u => u.user === user && u.password === password);

    if (!foundUser) {
      setSignInError(true);
      return;
    }

    console.log('Iniciar sesión con:', user);
    setSignInError(false);

    if (foundUser.state === 'nuevo') {
      navigate('/Notificacion');
    } else {
      navigate('/inicio');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const newUser = {
      user: e.target.querySelector('input[name="user"]').value,
      email: e.target.querySelector('input[name="Correo"]').value,
      password: e.target.querySelector('input[name="Contraseña"]').value,
      fullName: e.target.querySelector('input[name="Nombre Completo"]').value,
      state: 'nuevo', // Nuevo usuario, pendiente de verificación de correo
      role: 'user' // Por defecto, todos los nuevos usuarios tienen rol de usuario normal
    };

    setUsersDatabase(prevUsers => [...prevUsers, newUser]);
    setShowConfirmation(true);

    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000); // Mostrar el mensaje de éxito durante 3 segundos

    console.log('Nuevo usuario registrado:', newUser.user);
  };

  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container" ref={containerRef}>
      <div className="form-container sign-in-container">
        <form action="#" onSubmit={handleSignIn}>
          <h1>Iniciar Sesión</h1>
          <span>Utilice su Nombre de Usuario</span>
          <input type="text" placeholder="Usuario" maxLength="15" name="user" onChange={() => setSignInError(false)} required />
          <div style={{ position: 'relative' }}>
            <input type={showPassword ? "text" : "password"} placeholder="Contraseña" name="Contraseña" onChange={() => setSignInError(false)} required />
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={() => setShowPassword(!showPassword)} className="eye-icon" style={{ color: "#7f24f5", position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
          {signInError && (
            <div className="error-icon">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <p>El usuario o la contraseña son incorrectos.</p>
            </div>
          )}
          <a href="#" onClick={handleRecuperacionContraseña}>¿Olvidó su contraseña?</a>
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
      <div className="form-container sign-up-container">
        <form action="#" onSubmit={handleSignUp}>
          <h1>{isSignUp ? 'Registrar' : 'Crear tu cuenta'}</h1>
          <span>Ingrese los siguientes Datos</span>
          <input type="text" placeholder="Usuario" maxLength="15" name="user" required />
          <input type="name" placeholder="Nombre Completo" maxLength="100" name="Nombre Completo" required />
          <input type="email" placeholder="Email" maxLength="50" name="Correo" required />
          <div style={{ position: 'relative' }}>
            <input type={showPassword ? "text" : "password"} placeholder="Contraseña" name="Contraseña" minLength="8" onChange={() => setSignUpError(false)} required />
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={() => setShowPassword(!showPassword)} className="eye-icon" style={{ color: "#7f24f5", position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
          {signUpError && (
            <div className="error-icon">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <p>La contraseña debe tener al menos 8 caracteres.</p>
            </div>
          )}
          <input type="password" placeholder="Confirmar Contraseña" name="ConfirmarContraseña" minLength="8" onChange={() => setSignUpError(false)} required />
          {signUpError && (
            <div className="error-icon">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <p>Las contraseñas no coinciden.</p>
            </div>
          )}
          <button type="submit">Registrarse</button>
          {showConfirmation && (
            <div className="success-message">
              <FontAwesomeIcon icon={faCheckCircle} />
              <p>¡Usuario creado exitosamente!</p>
            </div>
          )}
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
            <button className="ghost" id="signUp">Registrarse</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
