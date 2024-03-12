import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './notificacion.css';

const Notificacion = () => {
  const navigate = useNavigate();
  const form = useRef();
  const [randomNumber, setRandomNumber] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  const generateRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const name = e.target.user_name.value;
    const email = e.target.user_email.value;

    if (!name || !email) {
      setVerificationStatus('Please fill in all required fields.');
      return;
    }

    const number = generateRandomNumber();
    setRandomNumber(number);
    form.current['message'].value = number;

    emailjs
      .sendForm('service_8c8qr6t', 'template_7auoceq', form.current, {
        publicKey: '3fGh9AcG7zbWjB_Cz',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setVerificationStatus('Email sent successfully. Please check your inbox for the verification code.');
          setShowVerificationForm(true);
        },
        (error) => {
          console.log('FAILED...', error.text);
          setVerificationStatus('An error occurred while sending the email. Please try again later.');
        }
      );
  };

  const verifyCode = (e) => {
    e.preventDefault();
    const userCode = e.target.user_code.value;

    if (!/^\d{6}$/.test(userCode)) {
      setVerificationStatus('Invalid code format. Please enter a 6-digit number.');
      return;
    }

    if (userCode === randomNumber.toString()) {
      setVerificationStatus('Verification successful!');
      setAttemptsLeft(3);
      navigate('/Inicio'); // Redireccionar a /Inicio si el código es correcto
    } else {
      if (attemptsLeft > 1) {
        setAttemptsLeft(attemptsLeft - 1);
        setVerificationStatus(`Invalid verification code. ${attemptsLeft - 1} attempts left.`);
      } else {
        setVerificationStatus('No attempts left. Please try again later.');
        navigate('/'); // Redireccionar a /Login si se terminan los intentos
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVerificationStatus('');
    }, 120000);

    return () => clearTimeout(timeout);
  }, [verificationStatus]);

  return (
    <>
      {!showVerificationForm && !verificationStatus && (
        <form ref={form} onSubmit={sendEmail} className="field">
          <label>Name</label>
          <input type="text" name="user_name" required />
          <label>Email</label>
          <input type="email" name="user_email" required />
          <input type="hidden" name="message" />
          <input type="submit" value="Send" />
        </form>
      )}

      {(showVerificationForm || verificationStatus) && (
        <form onSubmit={verifyCode}>
          <label>Enter verification code sent to your email</label>
          <input
            type="text"
            name="user_code"
            maxLength="6"
            pattern="\d*"
            inputMode="numeric"
            required
          />
          <input type="submit" value="Verify" />
          {verificationStatus && <p>{verificationStatus}</p>}
        </form>
      )}
    </>
  );
};

export default Notificacion;
