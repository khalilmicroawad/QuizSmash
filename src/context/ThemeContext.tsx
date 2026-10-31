import React, { createContext, useContext, useEffect } from 'react';

interface ThemeContextType {
  theme: 'light';
  isDark: false;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isDark: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Permanently enforce light/white theme
    const root = document.documentElement;
    root.classList.remove('dark');
    try {
      localStorage.removeItem('quizsmash_theme');
    } catch {
      // ignore storage access errors
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'light', isDark: false }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
