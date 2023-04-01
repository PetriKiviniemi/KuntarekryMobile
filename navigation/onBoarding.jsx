import React from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 40,
    fontFamily: "sans-serif-medium",
  },
  subtitleText: {
    fontSize: 18,
  },
});

export default function OnBoarding({ navigation }) {
  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>Kuntarekry</Text>
        <Text style={styles.subtitleText}>
          Tervetuloa löytämään unelmiesi työpaikka
        </Text>
      <Text style={{marginTop:100}}>Täppää jatkaaksesi</Text>
    </View>
  );
}
