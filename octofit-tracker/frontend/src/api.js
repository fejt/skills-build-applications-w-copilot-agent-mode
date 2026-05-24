export const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
export const API_BASE = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : `http://localhost:8000/api`;

export function normalizeListPayload(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (value?.items && Array.isArray(value.items)) {
    return value.items;
  }

  if (value?.data && Array.isArray(value.data)) {
    return value.data;
  }

  if (value?.results && Array.isArray(value.results)) {
    return value.results;
  }

  return [];
}
