import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OnBoardingRecommendations from "./onBoardingRecommendations";

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

export default function OnBoardingSkills({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.subtitleText}>Mainiota! Mitkä ovat huipputaitojasi?</Text>
      <Text style={styles.subtitleText}>Voit valita allaolevista korkeintaan viisi.</Text>
      <Button title="Jatketaan" onPress={()=> {navigation.navigate(OnBoardingRecommendations)}}/>
    </View>
  );
}
