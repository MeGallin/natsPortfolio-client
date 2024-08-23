import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState({
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateEmail(email);

    if (emailError) {
      setErrors({
        email: emailError,
      });
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_END_POINT}api/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.data);
        // Reset form fields

        setEmail('');

        setErrors({ email: '' });
      } else {
        throw new Error('Failed to send message.');
      }
    } catch (error) {
      setErrorMessage(
        'There was an error submitting the form. Please try again later.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Box
        my={4}
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={4}
        p={2}
      >
        <Typography variant="h3" align="center" gutterBottom>
          Password reset request
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Please provide your email address.
        </Typography>
        <form onSubmit={handleSubmit} style={formStyle}>
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>Contact Information</legend>

            {successMessage && (
              <p style={successMessageStyle}>{successMessage}</p>
            )}
            {errorMessage && <p style={errorMessageStyle}>{errorMessage}</p>}

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

            <Button
              text="Submit"
              color={getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-color')
                .trim()}
              disabled={isSubmitting || !email}
              style={buttonStyle} // Applied full-width style
            />
          </fieldset>
        </form>
        <div>
          <Link href="/admin" color="inherit">
            Go back to login page?
          </Link>
        </div>
      </Box>
    </>
  );
};

export default ForgotPassword;

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
