import React, { useState } from "react";
import { Text, StyleSheet, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "./gradientBackground";
import { ChatAvatar, ChatBubble, InputField } from "./chatBot";
import OnBoardingLocation from "./onBoardingLocation";

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

const chatTexts = [
  'Moi! Minä olen RekryBotti.',
  'Etsitään sinulle yhdessä unelmiesi työpaikka!',
  'Kertoisitko minulle aluksi nimesi?'
]

export default function OnBoardingUserName({ navigation }) {

  const [userName, setUserName] = useState('');

  const onContinuePress = () => {
    console.log("Username on nyt (Name screen) : ", userName);
    navigation.navigate('OnBoardingLocation', userName);
  }

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground>
      <ChatAvatar />
      <ChatBubble text={ chatTexts[0] } />
      <ChatBubble text={ chatTexts[1] } />
      <ChatBubble text={ chatTexts[2] } />
      <InputField
        placehonder={ 'Nimi...' }
        inputFunc={ setUserName }
        inputValue={ userName }
        buttonFunc={ () => { onContinuePress() } }
        hasBackButton={ true }
        backFunc={ () => { navigation.navigate('HomeScreen') } }
      />
    </GradientBackground>
    </SafeAreaView>
  );
}
