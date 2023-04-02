import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "../homeScreen";

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

export default function OnBoardingRecommendations({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.subtitleText}>Kiitos. Nämä työpaikat voisivat kiinnostaa sinua.</Text>
      <Button title="Lisää työpaikkoja" onPress={() => {navigation.navigate(HomeScreen)}}/>
    </View>
  );
}
