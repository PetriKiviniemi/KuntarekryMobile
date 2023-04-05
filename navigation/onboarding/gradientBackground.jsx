import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../styles";

const GradientBackground = ({ children }) => (
  <View>
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
      {children}
    </LinearGradient>
  </View>
)

export default GradientBackground
