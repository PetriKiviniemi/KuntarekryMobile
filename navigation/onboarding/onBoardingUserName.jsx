import React, { useState } from "react";
import GradientBackground from "./gradientBackground";
import { ChatAvatar, ChatBubble, InputField } from "./chatBot";

const chatTexts = [
  'Moi! Minä olen RekryBotti.',
  'Etsitään sinulle yhdessä unelmiesi työpaikka!',
  'Kertoisitko minulle aluksi nimesi?'
]

export default function OnBoardingUserName({ navigation }) {

  const [userName, setUserName] = useState('');

  const onContinuePress = () => {
    console.log("Username on nyt : ", userName);
    navigation.navigate('OnBoardingLocation', { userName: userName });
  }

  return (
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
  );
}
