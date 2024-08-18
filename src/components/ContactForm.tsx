import React, { useState } from 'react';
import Input from './common/Input';
import Button from './common/Button';

const ContactForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFullName = (name: string): string => {
    const parts = name.trim().split(' ');
    if (parts.length < 2) {
      return 'Please enter both your first name and surname.';
    }
    return '';
  };

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const validateMessage = (message: string): string => {
    if (!message.trim()) {
      return 'Message cannot be empty.';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fullNameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const messageError = validateMessage(message);

    if (fullNameError || emailError || messageError) {
      setErrors({
        fullName: fullNameError,
        email: emailError,
        message: messageError,
      });
      return;
    }

    setIsSubmitting(true);

    // Mock submission logic
    setTimeout(() => {
      alert(
        `Form submitted!\n\nFull Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
      );
      setIsSubmitting(false);
      // Reset form fields
      setFullName('');
      setEmail('');
      setMessage('');
      setErrors({ fullName: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>CONTACT INFORMATION</legend>

        <div style={fieldStyle}>
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={inputStyle} // Applied full-width style
          />
          {errors.fullName && <span style={errorStyle}>{errors.fullName}</span>}
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
          disabled={isSubmitting || !fullName || !email || !message}
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

const errorStyle: React.CSSProperties = {
  color: 'red',
  fontSize: '12px',
  marginTop: '-10px',
  marginBottom: '10px',
};
