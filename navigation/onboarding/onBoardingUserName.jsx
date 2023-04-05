import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OnBoardingLocation from "./onBoardingLocation";
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

export default function OnBoardingUserName({ navigation }) {

  const [userName, setUserName] = useState('');

  const onContinuePress = () => {
    console.log("Username on nyt : ", userName);
    navigation.navigate(OnBoardingLocation(userName));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subtitleText}>Moi! Minä olen RekryBotti.</Text>
      <Text style={styles.subtitleText}>
        Etsitään sinulle yhdessä unelmiesi työpaikka.
      </Text>
      <Text style={styles.subtitleText}>
        Kertoisitko minulle aluksi nimesi?
      </Text>
      <TextInput
      onChangeText={setUserName}
      value={userName}
      placeholder="Syötä nimesi..."/>

      <Button title="Aloitetaan" onPress={onContinuePress}/>
      <Button title="Minulla on jo tili" onPress={()=>{navigation.navigate(HomeScreen)}}/>
    </SafeAreaView>
  );
}
