import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_RECENT = '@recent_searches';
const KEY_FAV = '@favorites';
const KEY_CACHED = '@cached_city';
const KEY_UNIT = '@unit_celsius';

export async function getRecent() {
  try {
    const v = await AsyncStorage.getItem(KEY_RECENT);
    return v ? JSON.parse(v) : [];
  } catch (e) {
    return [];
  }
}
export async function setRecent(arr) {
  try {
    await AsyncStorage.setItem(KEY_RECENT, JSON.stringify(arr));
  } catch (e) {}
}

export async function getFavorites() {
  try {
    const v = await AsyncStorage.getItem(KEY_FAV);
    return v ? JSON.parse(v) : [];
  } catch (e) {
    return [];
  }
}
export async function setFavorites(arr) {
  try {
    await AsyncStorage.setItem(KEY_FAV, JSON.stringify(arr));
  } catch (e) {}
}

export async function cacheCity(city) {
  try {
    await AsyncStorage.setItem(KEY_CACHED, JSON.stringify(city));
  } catch (e) {}
}
export async function getCachedCity() {
  try {
    const v = await AsyncStorage.getItem(KEY_CACHED);
    return v ? JSON.parse(v) : null;
  } catch (e) {
    return null;
  }
}

export async function getUnit() {
  try {
    const v = await AsyncStorage.getItem(KEY_UNIT);
    return v === null ? true : JSON.parse(v);
  } catch (e) {
    return true;
  }
}
export async function setUnit(val) {
  try {
    await AsyncStorage.setItem(KEY_UNIT, JSON.stringify(val));
  } catch (e) {}
}
