"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeName } from "@/lib/types";
import { getStoredTheme, saveTheme } from "@/lib/storage";

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (nextTheme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("dawn");

  useEffect(() => {
    const initialTheme = getStoredTheme();
    setThemeState(initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (nextTheme: ThemeName) => setThemeState(nextTheme)
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
