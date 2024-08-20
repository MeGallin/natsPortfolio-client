export function isAuthenticated(): boolean {
  const token = localStorage.getItem('authToken');
  return !!token;
}
