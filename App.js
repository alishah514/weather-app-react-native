import React from 'react';
import { WeatherProvider } from './src/context/WeatherContext';
import { ThemeProvider } from './src/context/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <HomeScreen />
      </WeatherProvider>
    </ThemeProvider>
  );
}
