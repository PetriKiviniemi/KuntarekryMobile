import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../styles";

const GradientBackground = ({ children }) => (
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
      { children }
    </LinearGradient>
  </SafeAreaView>
)

export default GradientBackground
