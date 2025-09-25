import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { wp } from '../utils/dimensions';

export default function RecentList({ recent = [], onSelect, removeRecent }) {
  const { isDark } = useContext(ThemeContext);
  if (!recent.length) return null;
  return (
    <View style={{ marginTop: wp(2) }}>
      <Text
        style={{ fontWeight: '700', color: isDark ? '#E6EEF6' : '#0B1220' }}
      >
        Recent Searches
      </Text>
      {recent.map(item => (
        <View key={item} style={styles.row}>
          <TouchableOpacity onPress={() => onSelect(item)} style={{ flex: 1 }}>
            <Text style={{ color: isDark ? '#E6EEF6' : '#0B1220' }}>
              {item}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeRecent(item)}>
            <Text style={{ color: '#ef4444' }}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(2.5),
    borderBottomWidth: 0.4,
    borderColor: '#ccc',
  },
});
