import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export const wp = percentage => {
  return (percentage * width) / 100;
};

export const hp = percentage => {
  const screenHeight = height;

  if (Platform.OS === 'android') {
    return (percentage * (screenHeight - StatusBar.currentHeight)) / 100;
  }
  return (percentage * screenHeight) / 100;
};

export default {
  screenWidth: width,
  screenHeight: height,
  wp,
  hp,
};
