import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './notificacion.css';

const Notificacion = () => {
  const form = useRef();
  const [randomNumber, setRandomNumber] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  // Función para generar un número aleatorio de 6 dígitos
  const generateRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  // Función para enviar el correo electrónico
  const sendEmail = (e) => {
    e.preventDefault();
    const number = generateRandomNumber();

    // Guarda el número aleatorio en el estado y lo envía por correo electrónico
    setRandomNumber(number);
    form.current['message'].value = number;

    emailjs
      .sendForm('service_8c8qr6t', 'template_7auoceq', form.current, {
        publicKey: '3fGh9AcG7zbWjB_Cz',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  // Función para verificar el código ingresado por el usuario
  const verifyCode = (e) => {
    e.preventDefault();
    const userCode = e.target.user_code.value;

    if (userCode === randomNumber.toString()) {
      setVerificationStatus('Verificacion Completada!');
    } else {
      setVerificationStatus('Codigo incorrecto');
    }
  };

  useEffect(() => {
    // Limpia el estado de verificación después de 2 minutos
    const timeout = setTimeout(() => {
      setVerificationStatus('');
    }, 120000);

    return () => clearTimeout(timeout);
  }, [verificationStatus]);

  return (
    <>
      {!verificationStatus && (
        <form ref={form} onSubmit={sendEmail} className="field">
          <label>Name</label>
          <input type="text" name="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" />
          <input type="hidden" name="message" />
          <input type="submit" value="Send" />
        </form>
      )}
      {randomNumber && !verificationStatus && (
        <form onSubmit={verifyCode}>
          <label>Enter verification code sent to your email</label>
          <input type="text" name="user_code" />
          <input type="submit" value="Verify" />
        </form>
      )}
      {verificationStatus && <p>{verificationStatus}</p>}
    </>
  );
};

export default Notificacion;
