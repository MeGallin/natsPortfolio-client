import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../state/authSlice';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
//MUI Imports
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const validatePassword = (password: string): string => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_END_POINT}api/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        dispatch(login({ user: result.name, token: result.token }));
        localStorage.setItem('authToken', result.token);
        setSuccessMessage(
          `Welcome, ${result.name}! You will be redirected in ${countdown} seconds.`,
        );

        // Trigger countdown and redirect inside useEffect to prevent setState during render
        setIsSubmitting(false);
        setCountdown(5);
      } else {
        setErrorMessage(
          'Login failed. Please check your credentials and try again.',
        );
        setIsSubmitting(false);
      }
    } catch (error) {
      setErrorMessage(
        'An error occurred while trying to log in. Please try again later.',
      );
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            navigate('/dashboard');
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup the interval on component unmount
    }
  }, [successMessage, navigate]);

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
        <form onSubmit={handleSubmit} style={formStyle}>
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>Login</legend>

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
                style={inputStyle}
              />
              {errors.email && <span style={errorStyle}>{errors.email}</span>}
            </div>

            <div style={fieldStyle}>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
              {errors.password && (
                <span style={errorStyle}>{errors.password}</span>
              )}
            </div>

            <Button
              text="Login"
              color={import.meta.env.VITE_PRIMARY_COLOR}
              disabled={isSubmitting || !email || !password}
              style={buttonStyle}
            />
          </fieldset>
        </form>
        <div>
          <Link href="/forgot-password" color="inherit">
            Forgotten your password?
          </Link>
        </div>
      </Box>
    </>
  );
};

export default Login;

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
  borderRadius: '6px',
  padding: '15px',
  backgroundColor: '#f9f9f9',
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
  width: '100%',
  boxSizing: 'border-box',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
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
};

const errorMessageStyle: React.CSSProperties = {
  color: 'red',
  fontSize: '14px',
  marginBottom: '10px',
};
