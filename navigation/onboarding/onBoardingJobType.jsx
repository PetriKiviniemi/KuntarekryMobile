import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OnBoardingField from "./onBoardingField";

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

export default function OnBoardingJobType({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.subtitleText}>Millaista työsuhdetta etsit?</Text>
      <Button title="Jatketaan" onPress={() => {navigation.navigate(OnBoardingField)}}/>
    </View>
  );
}
