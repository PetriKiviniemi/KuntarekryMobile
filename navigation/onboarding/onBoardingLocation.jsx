import React, { useState } from "react";
import Geolocation from '../../geolocation';
import GradientBackground from "./gradientBackground";
import { ChatAvatar, ChatBubble, InputField } from "./chatBot";

export default function OnBoardingLocation({ route, navigation }) {
  const [location, setLocation] = useState('');
  const userName = route.params.userName || '(ei nimeä)'

  const chatTexts = [
    `Hauska tutustua ${ userName }`,
    'Kertoisitko seuraavaksi miltä alueelta etsit töitä?'
  ]
  
  const onContinuePress = () => {
    let data = route.params
    data.location = location
    console.log("Tähänastiset tiedot: ", data)
    navigation.navigate('OnBoardingJobType', data);
  }
  
  return (
    <GradientBackground>
      <ChatAvatar />
      <ChatBubble text={ chatTexts[0] } />
      <ChatBubble text={ chatTexts[1] } />
      <Geolocation callback={ () => {} } />
      <InputField
        placehonder={ 'Sijainti...' }
        inputFunc={ setLocation }
        inputValue={ location }
        buttonFunc={ () => { onContinuePress() } }
      />
    </GradientBackground>
  );
}
