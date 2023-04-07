import React from "react";
import GradientBackground from "./gradientBackground";
import { ChatArea, ListWidget } from "./chatBot";

const initialJobTypes = [
  { name: 'Kokoaikatyö',  checked: false },
  { name: 'Osa-aikatyö',  checked: false },
  { name: 'Kesätyö',      checked: false },
  { name: 'Vuorotyö',     checked: false },
  { name: 'Tuntityö',     checked: false }
]

export default function OnBoardingJobType({ route, navigation }) {
  const onContinuePress = (checkedJobTypes) => {
    let data = route.params
    data.jobTypes = checkedJobTypes
    console.log("Tähänastiset tiedot: ", data)
    navigation.navigate('OnBoardingField', data);
  }

  return (
    <GradientBackground>
      <ChatArea chatTexts={[{ text: 'Millaista työsuhdetta etsit?' }]} />
      <ListWidget data={ initialJobTypes } callback={ onContinuePress } />
    </GradientBackground>
  );
}
