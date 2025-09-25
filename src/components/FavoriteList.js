import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { wp } from '../utils/dimensions';

export default function FavoriteList({ favorites = [], onSelect }) {
  const { isDark } = useContext(ThemeContext);
  if (!favorites.length) return null;
  return (
    <View style={{ marginTop: wp(3) }}>
      <Text
        style={{ fontWeight: '700', color: isDark ? '#E6EEF6' : '#0B1220' }}
      >
        Favorites
      </Text>
      {favorites.map(item => (
        <TouchableOpacity
          key={item}
          onPress={() => onSelect(item)}
          style={{ marginTop: wp(2) }}
        >
          <Text style={{ color: isDark ? '#E6EEF6' : '#0B1220' }}>
            ★ {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
