export const validateFullName = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length < 2) {
    return 'Please enter both your first name and surname.';
  }
  return '';
};

export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address.';
  }
  return '';
};

export const validateMessage = (message: string): string => {
  if (!message.trim()) {
    return 'Message cannot be empty.';
  }
  return '';
};

export const validatePassword = (password: string): string => {
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }
  return '';
};
