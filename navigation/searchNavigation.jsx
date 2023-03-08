import React from 'react';
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

export default function Search({ navigation }) {
  return (
    <SearchStackNavigator />
  );
}