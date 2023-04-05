import React, { useReducer } from "react";
import GradientBackground from "./gradientBackground";
import { ChatAvatar, ChatBubble, ButtonContainer, CheckList } from "./chatBot";

const initialJobTypes = [
  { name: 'Kokoaikatyö',  checked: false },
  { name: 'Osa-aikatyö',  checked: false },
  { name: 'Kesätyö',      checked: false },
  { name: 'Vuorotyö',     checked: false },
  { name: 'Tuntityö',     checked: false }
]

const reducer = (state, action) => {
  if (action.type === 'CHECKED') {
    return state.map((item) => {
      if (item.name === action.name) {
        return { ...item, checked: !item.checked };
      } else {
        return item;
      }
    });
  } else {
    return state;
  }
}

export default function OnBoardingJobType({ route, navigation }) {
  const [jobTypes, dispatch] = useReducer(reducer, initialJobTypes)

  const onContinuePress = () => {
    let data = route.params
    let jts = jobTypes.slice()
    let checkedJobTypes = []

    jts.forEach(item => {
      if (item.checked) checkedJobTypes.push(item.name)
    });

    data.jobTypes = checkedJobTypes
    console.log("Tähänastiset tiedot: ", data)
    navigation.navigate('OnBoardingField', data);
  }

  const handleChecked = (item) => {
    dispatch({ type: "CHECKED", name: item.name });
  }

  return (
    <GradientBackground>
      <ChatAvatar />
      <ChatBubble text={ 'Millaista työsuhdetta etsit?' } />
      <CheckList data={ jobTypes } tapFunc={ handleChecked } />
      <ButtonContainer
        buttonFunc={ () => onContinuePress() }
      />
    </GradientBackground>
  );
}
