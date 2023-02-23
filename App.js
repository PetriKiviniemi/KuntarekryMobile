import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Api from './api';
import Geolocation from './geolocation';
import BottomNav from './bottomnav';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

      <View style={styles.bottomnav}>
        <BottomNav />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  bottomnav: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
});
