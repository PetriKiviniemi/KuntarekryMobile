import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnBoarding from './onboarding/onBoarding';
import RequestName from './onboarding/requestName';

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
      <Stack.Screen name="RequestName" component={RequestName} />


    </Stack.Navigator>
  )
}

export default function OnboardingNavigator({ navigation }) {
  return (
    <OnboardingStackNavigator />
  );
}
