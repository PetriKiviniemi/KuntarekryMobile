import React from "react";
import { View } from "react-native";
import GradientBackground from "./gradientBackground";
import { ButtonContainer, ChatArea } from "./chatBot";
import Styles, { Colors } from "../../styles";
import JobAdvertisementSummary from '../../widgets/jobAdvertisementSummary';
import dummySearchResults from '../dummySearchResults';


const chatTexts = [
  { text: 'Kiitos! Näiden avulla varmasti löydetään sinulle sopiva työpaikka.' },
  { text: 'Antamiesi tietojen perusteella nämä työpaikat voisivat kiinnostaa sinua.' }
]

export default function OnBoardingRecommendations({ route, navigation }) {

  const renderRecommendations = () => {
    let recs = dummySearchResults['searchResults'].slice(0, 2)
    return recs.map((rec, i) => (
      <JobAdvertisementSummary
        values={ rec }
        navigation={ navigation }
        key={ i }
        iconColor={ Colors.darkMain }
        backgroundColor={ Colors.accentGreenBright }
      />
    ))
  }

  return (
  <GradientBackground>
    <ChatArea chatTexts={ chatTexts } />
    <View style={[ Styles.alignCenter, { paddingTop: 10 } ]}>
      { renderRecommendations() }
    </View>
    <ButtonContainer
      text={ 'Lisää työpaikkoja' }
      buttonFunc={ () => navigation.navigate('SearchResults', dummySearchResults) }
    />
  </GradientBackground>
  );
}
