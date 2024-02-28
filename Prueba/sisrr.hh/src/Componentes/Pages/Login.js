import {React, useEffect, useState, useRef} from 'react'
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    const containerRef = useRef(null);
    const [isSignUp, setIsSignUp] = useState(false);
  
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
  
  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container" ref={containerRef}>
    <div className="form-container sign-in-container">
      <form action="#">
        <h1>Iniciar Sesión</h1>
        <span>o usa tu email</span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Contraseña" />
        <a href="#">Olvidaste tu contraseña?</a>
        <Button /*Redirigiendome hacia el incio*/
          buttonStyle='btn--outline' onClick={() => loginWithRedirect()}  >
          <Link to='/inicio'>Iniciar sesión</Link>
        </Button>
      </form>
    </div>
    <div className="form-container sign-up-container">
      <form action="#">
        <h1>{isSignUp ? 'Registrar' : 'Crear tu cuenta'}</h1>
        <div className="social-container">
          {/* Social icons go here */}
        </div>
        <span>o usa tu email como registro</span>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button id="lila">Registrar</button>
      </form>
    </div>
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>¡Bienvenido!</h1>
          <p>Inicia sesión con tu cuenta</p>
          <button className="ghost" id="signIn">Inicia sesión</button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>Hola!!!</h1>
          <p>Crear tu cuenta</p>
          <button className="ghost" id="signUp">Registrar</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login


