import { clearAuthToken, getAuthToken, isJwtExpired } from './utils/api';

export function isAuthenticated(): boolean {
  const token = getAuthToken();

  if (!token) {
    return false;
  }

  if (isJwtExpired(token)) {
    clearAuthToken();
    return false;
  }

  return true;
}
