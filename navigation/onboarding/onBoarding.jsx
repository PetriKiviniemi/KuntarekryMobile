import React from "react";
import { Text, TouchableOpacity } from "react-native";
import GradientBackground from "./gradientBackground";
import OnboardingStyles from "./onboardingStyles";
import Styles from "../../styles";
import { Platform } from 'react-native';


export default function OnBoarding({ navigation }) {
  return (
    <GradientBackground scroll={ false }>
        <TouchableOpacity 
          style={[  Styles.alignCenter, { height: '100%' } ]}
          onPress={ () => {navigation.navigate('OnBoardingUserName')} }
        >
          <Text style={[ OnboardingStyles.title, (Platform.OS === 'ios') ? OnboardingStyles.textIos : OnboardingStyles.text ]}>
            Kuntarekry
          </Text>
          <Text style={[ OnboardingStyles.subtitle, (Platform.OS === 'ios') ? OnboardingStyles.textIos : OnboardingStyles.text ]}>
            Tervetuloa löytämään unelmiesi työpaikka
          </Text>
          <Text style={[ { marginTop:100 }, (Platform.OS === 'ios') ? OnboardingStyles.textIos : OnboardingStyles.text ]}>
            Täppää jatkaaksesi
          </Text>
        </TouchableOpacity> 
    </GradientBackground>
  );
}
