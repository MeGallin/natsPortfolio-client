export const isAuthenticated = (): boolean => {
  // This is a simple mock. Replace this with real authentication logic.
  // For example, check if a token exists in localStorage or a context state.
  return Boolean(localStorage.getItem('authToken'));
};
