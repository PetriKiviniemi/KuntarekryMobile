import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobAdvertisement from './jobAdvertisementScreen';
import SearchResults from './searchResultsScreen';

const Stack = createNativeStackNavigator();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchResults" component={SearchResults} />
      <Stack.Screen name="JobAdvertisement" component={JobAdvertisement} />
    </Stack.Navigator>
  )
}

export default function Infoscreen({ navigation }) {
  return (
    <SearchStackNavigator />
  );
}