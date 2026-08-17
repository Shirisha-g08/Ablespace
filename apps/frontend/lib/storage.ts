import { AuthResponse, ThemeName } from "@/lib/types";

const THEME_KEY = "ablespace-theme";
const AUTH_KEY = "ablespace-auth";

export const getStoredTheme = (): ThemeName => {
  if (typeof window === "undefined") {
    return "dawn";
  }

  const theme = localStorage.getItem(THEME_KEY);
  if (theme === "night" || theme === "meadow" || theme === "dawn") {
    return theme;
  }

  return "dawn";
};

export const saveTheme = (theme: ThemeName): void => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getStoredAuth = (): AuthResponse | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthResponse;
  } catch {
    return null;
  }
};

export const saveAuth = (value: AuthResponse): void => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(value));
};

export const clearAuth = (): void => {
  localStorage.removeItem(AUTH_KEY);
};
