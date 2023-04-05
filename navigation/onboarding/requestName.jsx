import React from "react";
import GradientBackground from "./gradientBackground";
import { ChatAvatar, ChatBubble, InputField } from "./chatBot";

const chatTexts = [
  'Moi! Minä olen RekryBotti.',
  'Etsitään sinulle yhdessä unelmiesi työpaikka!',
  'Kertoisitko minulle aluksi nimesi?'
]

export default function RequestName({ navigation }) {
  return (
    <GradientBackground>
      <ChatAvatar />
      <ChatBubble text={ chatTexts[0] } />
      <ChatBubble text={ chatTexts[1] } />
      <ChatBubble text={ chatTexts[2] } />
      <InputField
        placehonder={ 'Nimi...' }
        inputFunc={ () => {} }
        buttonFunc={ () => {} }
      />
    </GradientBackground>
  );
}
