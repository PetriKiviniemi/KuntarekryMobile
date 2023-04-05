import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Geolocation from '../../geolocation';
import onBoardingJobType from "./onBoardingJobType";

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

export default function OnBoardingLocation({ navigation, userName }) {

  const [location, setLocation] = useState('');
  
  const onContinuePress = () => {
    console.log("Username on nyt: ", userName);
    console.log("Sijainti on nyt: ", location);
    navigation.navigate(onBoardingJobType);
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subtitleText}>Hauska tutustua *nimi*.</Text>
      <Text style={styles.subtitleText}>Kertoisitko seuraavaksi miltä alueelta etsit töitä?</Text>

      <Geolocation callback={ (text) => {
              setSearchText(text)
              searchStringFunc(text)
            } } />
            
      <Button title="Jatketaan" onPress={onContinuePress}></Button>
    </SafeAreaView>
  );
}
