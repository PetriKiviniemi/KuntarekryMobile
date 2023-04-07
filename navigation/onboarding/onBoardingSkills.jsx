import React from "react";
import GradientBackground from "./gradientBackground";
import { ChatArea, ListWidget } from "./chatBot";

const initialSkills = [
  { name: 'Jodlaus',      checked: false },
  { name: 'Syväsukellus', checked: false },
  { name: 'Jojotemput',   checked: false },
  { name: 'Istuminen',    checked: false },
  { name: 'Kyräily',      checked: false }
]

export default function OnBoardingSkills({ route, navigation }) {
  const onContinuePress = (checkedSkills) => {
    let data = route.params
    data.skills = checkedSkills
    console.log("Tähänastiset tiedot: ", data)
    navigation.navigate('OnBoardingRecommendations', data);
  }

  return (
  <GradientBackground>
    <ChatArea chatTexts={[{ text: 'Mainiota! Mitkä ovat huipputaitojasi?' }]} />
    <ListWidget data={ initialSkills } callback={ onContinuePress } />
  </GradientBackground>
  );
}
