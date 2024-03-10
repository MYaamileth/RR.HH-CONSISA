import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './notificacion.css';

const Notificacion = ()=> {

    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

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
        },
      );
  };

    return(
      <form ref={form} onSubmit={sendEmail} className='field'>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
      )
};

export default Notificacion
