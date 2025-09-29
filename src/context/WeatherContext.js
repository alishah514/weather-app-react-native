import React, { createContext, useState, useEffect } from 'react';
import {
  getRecent,
  setRecent,
  getFavorites,
  setFavorites,
  cacheCity,
  getCachedCity,
  getUnit,
  setUnit,
} from '../utils/storage';
import weatherData from '../../data/weatherData.json';

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [city, setCity] = useState(null);
  const [recent, setRecentState] = useState([]);
  const [favorites, setFavoritesState] = useState([]);
  const [unitCelsius, setUnitCelsius] = useState(true);

  useEffect(() => {
    (async () => {
      const r = await getRecent();
      const f = await getFavorites();
      const cached = await getCachedCity();
      const u = await getUnit();
      if (r) setRecentState(r);
      if (f) setFavoritesState(f);
      if (cached) setCity(cached);
      if (typeof u === 'boolean') setUnitCelsius(u);
    })();
  }, []);

  // --- SEARCH CITY FROM LOCAL JSON ---
  async function searchCity(query) {
    if (!query) return null;
    const q = query.trim().toLowerCase();

    const found = weatherData.cities.find(c => c.city.toLowerCase() === q);

    if (found) {
      setCity(found);
      await cacheCity(found);

      const next = [found.city, ...recent.filter(r => r !== found.city)].slice(
        0,
        10,
      );
      setRecentState(next);
      await setRecent(next);
    }

    return found || null;
  }

  // --- FAVORITES ---
  async function toggleFavorite(name) {
    let next;
    if (favorites.includes(name)) next = favorites.filter(f => f !== name);
    else next = [name, ...favorites];
    setFavoritesState(next);
    await setFavorites(next);
  }

  // --- UNIT TOGGLE ---
  async function toggleUnit(u) {
    setUnitCelsius(u);
    await setUnit(u);
  }

  // --- REMOVE RECENT ---
  async function removeRecent(name) {
    const next = recent.filter(r => r !== name);
    setRecentState(next);
    await setRecent(next);
  }

  return (
    <WeatherContext.Provider
      value={{
        city,
        searchCity,
        recent,
        favorites,
        toggleFavorite,
        toggleUnit,
        unitCelsius,
        removeRecent,
        setCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
