import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../styles";
import OnboardingStyles from "./onboardingStyles";

const GradientBackground = ({ children, scroll=true }) => (
  <SafeAreaView>
    <LinearGradient
      colors={[Colors.accentGreenBright, Colors.accentTealBright]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: '100%',
        height: '100%',
        paddingVertical: 50,
        paddingHorizontal: 25
      }} >
        {
          scroll ? 
          <ScrollView 
            contentContainerStyle={ OnboardingStyles.expandingView }
          >
            { children }
          </ScrollView>
          :
          <View>
            { children }
          </View>
        }
    </LinearGradient>
  </SafeAreaView>
)

export default GradientBackground
