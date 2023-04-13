import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnBoarding from './onboarding/onBoarding';
import OnBoardingUserName from './onboarding/onBoardingUserName';
import OnBoardingLocation from './onboarding/onBoardingLocation';
import OnBoardingJobType from './onboarding/onBoardingJobType';
import OnBoardingField from './onboarding/onBoardingField';
import OnBoardingRecommendations from './onboarding/onBoardingRecommendations';

const Stack = createNativeStackNavigator();

const OnboardingStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        animation: 'none'
      }}
    >
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="OnBoardingUserName" component={OnBoardingUserName}/>
      <Stack.Screen name="OnBoardingLocation" component={OnBoardingLocation}/>
      <Stack.Screen name="OnBoardingJobType" component={OnBoardingJobType}/>
      <Stack.Screen name="OnBoardingField" component={OnBoardingField}/>
      <Stack.Screen name="OnBoardingRecommendations" component={OnBoardingRecommendations}/>
    </Stack.Navigator>
  )
}

export default function OnboardingNavigator({ navigation }) {
  return (
    <OnboardingStackNavigator />
  );
}
