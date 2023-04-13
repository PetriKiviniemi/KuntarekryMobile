import React from "react";
import GradientBackground from "./gradientBackground";
import { ChatArea, ListWidget } from "./chatBot";

const initialFields = [
  { name: 'Hallinto- ja toimistotyö',  checked: false },
  { name: 'Opetus- ja kulttuuriala',   checked: false },
  { name: 'Sosiaaliala',               checked: false },
  { name: 'Tekninen ala',              checked: false },
  { name: 'Vapaaehtoistyö',            checked: false },
  { name: 'Terveydenhuoltoala',        checked: false }
]

export default function OnBoardingField({ route, navigation }) {
  const onContinuePress = (checkedFields) => {
    let data = route.params
    data.fields = checkedFields
    console.log("Tähänastiset tiedot: ", data)
    navigation.navigate('OnBoardingRecommendations', data);
  }

  return (
    <GradientBackground>
      <ChatArea chatTexts={[{ text: 'Mikä ala on eritysosaamistasi?' }]} />
      <ListWidget data={ initialFields } callback={ onContinuePress } />
    </GradientBackground>
  );
}
