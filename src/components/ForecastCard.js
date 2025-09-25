import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { wp } from '../utils/dimensions';

export default function ForecastCard({ item, unitCelsius }) {
  const { isDark } = useContext(ThemeContext);
  const temp = unitCelsius
    ? `${Math.round(item.tempC)}°C`
    : `${Math.round((item.tempC * 9) / 5 + 32)}°F`;
  return (
    <View
      style={[styles.card, { backgroundColor: isDark ? '#0F1724' : '#fff' }]}
    >
      <Text style={{ color: isDark ? '#E6EEF6' : '#0B1220' }}>{item.day}</Text>
      <Text style={{ fontWeight: '700', marginTop: 6 }}>{temp}</Text>
      <Text style={{ color: isDark ? '#9CA3AF' : '#4B5563', marginTop: wp(1) }}>
        {item.condition}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: wp(2.5),
    borderRadius: wp(2.5),
    marginRight: wp(2),
    alignItems: 'center',
  },
});
