import React from "react";
import { Text, TouchableOpacity } from "react-native";
import GradientBackground from "./gradientBackground";
import OnboardingStyles from "./onboardingStyles";
import Styles from "../../styles";

export default function OnBoarding({ navigation }) {
  return (
    <GradientBackground>
        <TouchableOpacity 
          style={[  Styles.alignCenter, { height: '100%' } ]}
          onPress={ () => {navigation.navigate('OnBoardingUserName')} }
        >
          <Text style={[ OnboardingStyles.title, OnboardingStyles.text ]}>
            Kuntarekry
          </Text>
          <Text style={[ OnboardingStyles.subtitle, OnboardingStyles.text ]}>
            Tervetuloa löytämään unelmiesi työpaikka
          </Text>
          <Text style={[ { marginTop:100 }, OnboardingStyles.text ]}>
            Täppää jatkaaksesi
          </Text>
        </TouchableOpacity> 
    </GradientBackground>
  );
}
