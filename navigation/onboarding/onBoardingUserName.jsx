import React, { useState } from "react";
import GradientBackground from "./gradientBackground";
import { InputField, ChatArea } from "./chatBot";

const chatTexts = [
  { text: 'Moi! Minä olen RekryBotti.' },
  { text: 'Etsitään sinulle yhdessä unelmiesi työpaikka!' },
  { text: 'Kertoisitko minulle aluksi nimesi?' }
]

export default function OnBoardingUserName({ navigation }) {

  const [userName, setUserName] = useState('');

  const onContinuePress = () => {
    console.log("Username on nyt : ", userName);
    navigation.navigate('OnBoardingLocation', { userName: userName });
  }

  return (
    <GradientBackground>
      <ChatArea chatTexts={ chatTexts } />
      <InputField
        placehonder={ 'Nimi...' }
        inputFunc={ setUserName }
        inputValue={ userName }
        buttonFunc={ () => { onContinuePress() } }
        hasBackButton={ true }
        backFunc={ () => { navigation.navigate('HomeScreen') } }
      />
    </GradientBackground>
  );
}
