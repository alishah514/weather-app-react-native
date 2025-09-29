import React, { useContext } from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import CityCard from '../components/CityCard';
import RecentList from '../components/RecentList';
import FavoriteList from '../components/FavoriteList';
import { WeatherContext } from '../context/WeatherContext';
import { ThemeContext } from '../context/ThemeContext';
import styles from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const {
    city,
    searchCity,
    recent,
    favorites,
    toggleFavorite,
    toggleUnit,
    unitCelsius,
    removeRecent,
  } = useContext(WeatherContext);
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0B1220' : '#F6F8FB' },
      ]}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View
        style={[
          styles.header,
          { backgroundColor: isDark ? '#0F1724' : '#fff' },
        ]}
      >
        <Text style={[styles.title, { color: isDark ? '#E6EEF6' : '#0B1220' }]}>
          SunnySide — Weather
        </Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
        >
          <Text
            style={{ color: isDark ? '#E6EEF6' : '#0B1220', marginRight: 6 }}
          >
            {unitCelsius ? 'C' : 'F'}
          </Text>
          <TouchableOpacity
            onPress={() => toggleUnit(!unitCelsius)}
            style={{ marginRight: 12 }}
          >
            <Text style={{ color: '#0ea5a5' }}>Toggle Unit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsDark(s => !s)}>
            <Text style={{ color: '#0ea5a5' }}>Toggle Theme</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SearchBar onSearch={q => searchCity(q)} />

      <ScrollView>
        <View style={styles.mainRow}>
          <View
            style={[
              styles.leftPane,
              { backgroundColor: isDark ? '#0F1724' : '#fff' },
            ]}
          >
            <RecentList
              recent={recent}
              onSelect={q => searchCity(q)}
              removeRecent={removeRecent}
            />
            <FavoriteList favorites={favorites} onSelect={q => searchCity(q)} />
            {console.log('favorites', favorites)}
          </View>

          <View
            style={[
              styles.rightPane,
              { backgroundColor: isDark ? '#0F1724' : '#fff' },
            ]}
          >
            <CityCard
              city={city}
              unitCelsius={unitCelsius}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
