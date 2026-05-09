export const getApiBaseUrl = (): string => import.meta.env.VITE_API_END_POINT || '';

export const getAuthToken = (): string | null => localStorage.getItem('authToken');

export const isJwtExpired = (token: string): boolean => {
  try {
    const [, payload] = token.split('.');
    if (!payload) return true;

    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    if (!decoded.exp || typeof decoded.exp !== 'number') return false;

    return decoded.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('authToken');
  window.dispatchEvent(new Event('authChange'));
};

export const getApiErrorMessage = async (
  response: Response,
  fallback = 'Request failed',
): Promise<string> => {
  try {
    const data = await response.json();
    return data.error || data.message || data.data || fallback;
  } catch {
    return fallback;
  }
};
