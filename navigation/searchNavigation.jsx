import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './homeScreen';
import JobAdvertisement from './jobAdvertisementScreen';
import SearchResults from './searchResultsScreen';
import Filters from './filterScreen';
import OnBoarding from './onboarding/onBoardingStart';

const Stack = createNativeStackNavigator();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SearchResults" component={SearchResults} />
      <Stack.Screen name="JobAdvertisement" component={JobAdvertisement} />
      <Stack.Screen name="Filters" component={Filters} />


      {/*For testing onboarding*/}
      <Stack.Screen name="OnBoarding" component={OnBoarding}/>
      
      
    </Stack.Navigator>
  )
}

export default function SearchNavigator({ navigation }) {
  return (
    <SearchStackNavigator />
  );
}