import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { wp, hp } from '../utils/dimensions';
import weatherData from '../../data/weatherData.json';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    if (!query) {
      setFiltered([]);
      return;
    }

    // 🔹 Filter directly from local JSON instead of fetching
    const results = weatherData.cities.filter(c =>
      c.city.toLowerCase().startsWith(query.toLowerCase()),
    );

    setFiltered(results);
  }, [query]);

  const handleSelect = city => {
    setSelected(city);
    setQuery(city.city);
    setFiltered([]);
    onSearch(city.city);
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? '#0F1724' : '#fff' },
        ]}
      >
        <TextInput
          style={[styles.input, { color: isDark ? '#E6EEF6' : '#0B1220' }]}
          placeholder="Search city (e.g., London)"
          placeholderTextColor={isDark ? '#999' : '#666'}
          value={query}
          onChangeText={text => {
            setQuery(text);
            setSelected(null); // reset selected city on typing
          }}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#0ea5a5' }]}
          onPress={() => {
            if (query) {
              onSearch(query);
              setQuery('');
              setFiltered([]);
            }
          }}
        >
          <Text style={{ color: '#fff' }}>Search</Text>
        </TouchableOpacity>
      </View>

      {query.length > 0 && (
        <View
          style={[
            styles.dropdown,
            { backgroundColor: isDark ? '#0F1724' : '#fff' },
          ]}
        >
          {filtered.length > 0 ? (
            <FlatList
              data={filtered}
              keyExtractor={item => item.city}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    handleSelect(item), setQuery('');
                  }}
                >
                  <Text style={{ color: isDark ? '#E6EEF6' : '#0B1220' }}>
                    {item.city}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text
              style={[
                styles.noRecord,
                { color: isDark ? '#E6EEF6' : '#0B1220' },
              ]}
            >
              No results found
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: wp(2.5),
    borderRadius: wp(2.5),
    alignItems: 'center',
  },
  input: { flex: 1, padding: wp(2.5) },
  button: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(3),
    borderRadius: wp(2),
    marginLeft: wp(2),
  },
  dropdown: {
    marginTop: -hp(1),
    borderRadius: wp(2),
    paddingVertical: hp(0.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownItem: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(3),
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  noRecord: {
    padding: hp(1.2),
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
