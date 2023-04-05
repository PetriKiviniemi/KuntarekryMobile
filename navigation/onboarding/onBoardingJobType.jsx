import React, { useState } from "react";
import GradientBackground from "./gradientBackground";
import { ChatAvatar, ChatBubble, ButtonContainer } from "./chatBot";

export default function OnBoardingJobType({ route, navigation }) {
  const [jobTypes, setjobTypes] = useState([]);

  const onContinuePress = () => {
    let data = route.params
    data.jobTypes = jobTypes
    console.log("Tähänastiset tiedot: ", data)
    navigation.navigate('OnBoardingField', data);
  }

  return (
    <GradientBackground>
      <ChatAvatar />
      <ChatBubble text={ 'Millaista työsuhdetta etsit?' } />
      <ButtonContainer
        buttonFunc={ () => { onContinuePress() } }
      />
    </GradientBackground>
  );
}
