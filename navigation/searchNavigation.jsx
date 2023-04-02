import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './homeScreen';
import JobAdvertisement from './jobAdvertisementScreen';
import SearchResults from './searchResultsScreen';
import Filters from './filterScreen';

import OnBoarding from './onboarding/onBoardingStart';
import OnBoardingUserName from './onboarding/onBoardingUserName';
import OnBoardingLocation from './onboarding/onBoardingLocation';
import OnBoardingJobType from './onboarding/onBoardingJobType';
import OnBoardingField from './onboarding/onBoardingField';
import OnBoardingSkills from './onboarding/onBoardingSkills';
import OnBoardingRecommendations from './onboarding/onBoardingRecommendations';

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
      <Stack.Screen name="OnBoardingUserName" component={OnBoardingUserName}/>
      <Stack.Screen name="OnBoardingLocation" component={OnBoardingLocation}/>
      <Stack.Screen name="OnBoardingJobType" component={OnBoardingJobType}/>
      <Stack.Screen name="OnBoardingField" component={OnBoardingField}/>
      <Stack.Screen name="OnBoardingSkills" component={OnBoardingSkills}/>
      <Stack.Screen name="OnBoardingRecommendations" component={OnBoardingRecommendations}/>
      
      
    </Stack.Navigator>
  )
}

export default function SearchNavigator({ navigation }) {
  return (
    <SearchStackNavigator />
  );
}