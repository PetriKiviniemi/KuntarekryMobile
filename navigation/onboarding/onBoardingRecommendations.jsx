import React from "react";
import GradientBackground from "./gradientBackground";
import { ButtonContainer, ChatArea } from "./chatBot";

const chatTexts = [
  { text: 'Kiitos! Näiden avulla varmasti löydetään sinulle sopiva työpaikka.' },
  { text: 'Antamiesi tietojen perusteella nämä työpaikat voisivat kiinnostaa sinua.' }
]

export default function OnBoardingRecommendations({ route, navigation }) {

  return (
  <GradientBackground>
    <ChatArea chatTexts={ chatTexts } />
    <ButtonContainer
      text={ 'Lisää työpaikkoja' }
      buttonFunc={ () => navigation.navigate('HomeScreen') }
    />
  </GradientBackground>
  );
}
