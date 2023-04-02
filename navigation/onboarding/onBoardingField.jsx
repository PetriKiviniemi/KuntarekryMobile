import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OnBoardingSkills from "./onBoardingSkills";

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

export default function OnBoardingField({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.subtitleText}>Mikä ala on eritysosaamistasi?</Text>
      <Button title="Jatketaan" onPress={()=> {navigation.navigate(OnBoardingSkills)}}/>
    </View>
  );
}
