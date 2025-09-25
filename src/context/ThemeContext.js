import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // default: night at 18:00 - 06:00
    const hour = new Date().getHours();
    setIsDark(hour < 6 || hour >= 18);

    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      // only auto if system changes and you want to follow system
      // setIsDark(colorScheme === 'dark');
    });
    return () => sub.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
