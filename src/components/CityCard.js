import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { hp, wp } from '../utils/dimensions';

export default function CityCard({
  city,
  unitCelsius,
  toggleFavorite,
  favorites,
}) {
  const { isDark } = useContext(ThemeContext);

  if (!city)
    return (
      <Text
        style={{ textAlign: 'center', color: isDark ? '#E6EEF6' : '#0B1220' }}
      >
        Search a city to see weather details
      </Text>
    );

  const formatTemp = t =>
    unitCelsius ? `${Math.round(t)}°C` : `${Math.round((t * 9) / 5 + 32)}°F`;

  const isFav = favorites.includes(city.city);

  // Weather-based styling
  const weatherStyles = {
    Sunny: {
      bgColor: '#FFF7C0', // soft yellow
      textColor: '#333', // dark for readability
      borderColor: '#FFD700',
      icon: '☀️',
    },
    Cloudy: {
      bgColor: '#E0E0E0', // light gray
      textColor: '#333',
      borderColor: '#A0A0A0',
      icon: '☁️',
    },
    Rainy: {
      bgColor: '#A0D8FF', // soft blue
      textColor: '#000',
      borderColor: '#1E90FF',
      icon: '🌧',
    },
  };

  const currentWeather = weatherStyles[city.weather] || {
    bgColor: '#F0F0F0',
    textColor: '#333',
    borderColor: '#ccc',
    icon: '❓',
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentWeather.bgColor,
          borderColor: currentWeather.borderColor,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.cityName, { color: currentWeather.textColor }]}>
          {city.city}
        </Text>
        <TouchableOpacity onPress={() => toggleFavorite(city.city)}>
          <Text style={{ fontSize: 28, color: isFav ? '#f59e0b' : '#888' }}>
            {isFav ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tempRow}>
        <Text style={[styles.tempLarge, { color: currentWeather.textColor }]}>
          {formatTemp(city.temperature)}
        </Text>
        <Text style={[styles.weatherIcon]}>{currentWeather.icon}</Text>
      </View>

      <Text style={[styles.weatherText, { color: currentWeather.textColor }]}>
        {city.weather}
      </Text>

      <View style={styles.infoGrid}>
        <View style={styles.infoBox}>
          <Text style={{ color: currentWeather.textColor }}>Humidity</Text>
          <Text style={{ fontWeight: '700', color: currentWeather.textColor }}>
            {city.humidity}%
          </Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={{ color: currentWeather.textColor }}>Wind</Text>
          <Text style={{ fontWeight: '700', color: currentWeather.textColor }}>
            {city.windSpeed} kph
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: wp(4),
    borderRadius: wp(4),
    borderWidth: 1,
    marginVertical: hp(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityName: {
    fontSize: wp(6.5),
    fontWeight: '800',
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  tempLarge: {
    fontSize: wp(14),
    fontWeight: '900',
  },
  weatherIcon: {
    fontSize: wp(12),
    marginLeft: wp(3),
  },
  weatherText: {
    fontSize: wp(5),
    fontWeight: '600',
    marginTop: hp(0.5),
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp(2),
  },
  infoBox: {
    alignItems: 'center',
    paddingHorizontal: wp(2),
  },
});
