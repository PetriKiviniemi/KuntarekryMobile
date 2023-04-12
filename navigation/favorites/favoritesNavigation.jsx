import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoriteScreen from './favoritesScreen';
import JobAdvertisement from '../jobAdvertisementScreen';

const Stack = createNativeStackNavigator();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Suosikkejasi" component={FavoriteScreen} />
      <Stack.Screen name="JobAdvertisement" component={JobAdvertisement} />
    </Stack.Navigator>
  )
}

export default function FavoritesNavigation({ navigation }) {
  return (
    <SearchStackNavigator />
  );
}