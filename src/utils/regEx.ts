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

export const validateTitle = (title: string): string => {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    return 'Title is required.';
  }
  if (trimmedTitle.length < 3) {
    return 'Title must be at least 3 characters long.';
  }
  return '';
};

export const validateDescription = (description: string): string => {
  const trimmedDescription = description.trim();
  if (!trimmedDescription) {
    return 'Description is required.';
  }
  if (trimmedDescription.length < 10) {
    return 'Description must be at least 10 characters long.';
  }
  return '';
};

export const  validateBy = (author: string): string => {
  const trimmedAuthor = author.trim();
  if (!trimmedAuthor) {
    return 'Author name is required.';
  }
  if (trimmedAuthor.length < 2) {
    return 'Author name must be at least 2 characters long.';
  }
  return '';
};
