import React, { createContext, useState } from 'react';

const lightTheme = {
  dark: false,
  colors: {
    primary: '#2B6CB0',
    background: '#F8F9FD',
    card: '#FFFFFF',
    text: '#1A2138',
    border: '#E2E8F0',
    notification: '#FF4444',
  },
};

const darkTheme = {
  dark: true,
  colors: {
    primary: '#63B3ED',
    background: '#1A202C',
    card: '#2D3748',
    text: '#F7FAFC',
    border: '#4A5568',
    notification: '#FC8181',
  },
};

export const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme.dark ? lightTheme : darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 