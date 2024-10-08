import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../state/store';
import { RootState } from '../state/store'; // Adjust the import based on your store setup
import { submitContactForm } from '../state/contactFormSlice';
import {
  validateFullName,
  validateEmail,
  validateMessage,
} from '../utils/regEx';
import Input from './common/Input';
import Button from './common/Button';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const dispatch: AppDispatch = useDispatch();

  const { isSubmitting, successMessage, errorMessage } = useSelector(
    (state: RootState) => state.contactForm,
  );

  useEffect(() => {
    if (successMessage) {
      setName('');
      setEmail('');
      setMessage('');
    }
  }, [successMessage]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameError = validateFullName(name);
    const emailError = validateEmail(email);
    const messageError = validateMessage(message);

    if (nameError || emailError || messageError) {
      setErrors({
        name: nameError,
        email: emailError,
        message: messageError,
      });

      return;
    }

    dispatch(submitContactForm({ name, email, message }));
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>Contact Information</legend>

        {successMessage && <p style={successMessageStyle}>{successMessage}</p>}
        {errorMessage && <p style={errorMessageStyle}>{errorMessage}</p>}

        <div style={fieldStyle}>
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle} // Applied full-width style
          />
          {errors.name && <span style={errorStyle}>{errors.name}</span>}
        </div>

        <div style={fieldStyle}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle} // Applied full-width style
          />
          {errors.email && <span style={errorStyle}>{errors.email}</span>}
        </div>

        <div style={fieldStyle}>
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={textareaStyle}
          />
          {errors.message && <span style={errorStyle}>{errors.message}</span>}
        </div>

        <Button
          text="Submit"
          color={getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color')
            .trim()}
          disabled={isSubmitting || !name || !email || !message}
          style={buttonStyle} // Applied full-width style
        />
      </fieldset>
    </form>
  );
};

export default ContactForm;

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  width: '100%',
  maxWidth: '500px',
  margin: 'auto',
  padding: '0 15px',
  boxSizing: 'border-box',
};

const fieldsetStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  borderRadius: '6px', // Subtle border-radius
  padding: '15px',
  backgroundColor: '#f9f9f9', // Light background color
};

const legendStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  padding: '0 10px',
};

const fieldStyle: React.CSSProperties = {
  marginBottom: '15px',
};

const inputStyle: React.CSSProperties = {
  width: '100%', // Full width for the input
  boxSizing: 'border-box',
};

const textareaStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '16px',
  margin: '5px 0',
  width: '100%', // Full width for the textarea
  height: '100px',
  resize: 'vertical',
  boxSizing: 'border-box',
};

const buttonStyle: React.CSSProperties = {
  width: '100%', // Full width for the button
  boxSizing: 'border-box',
};

const errorStyle: React.CSSProperties = {
  color: 'red',
  fontSize: '12px',
  marginTop: '-10px',
  marginBottom: '10px',
};

const successMessageStyle: React.CSSProperties = {
  color: 'green',
  fontSize: '14px',
  marginBottom: '10px',
};

const errorMessageStyle: React.CSSProperties = {
  color: 'red',
  fontSize: '14px',
  marginBottom: '10px',
};
