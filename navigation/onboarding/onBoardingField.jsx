import React, { useReducer } from "react";
import GradientBackground from "./gradientBackground";
import { ChatAvatar, ChatBubble, CheckList, ButtonContainer } from "./chatBot";

const initialFields = [
  { name: 'Hallinto- ja toimistotyö',  checked: false },
  { name: 'Opetus- ja kulttuuriala',   checked: false },
  { name: 'Sosiaaliala',               checked: false },
  { name: 'Tekninen ala',              checked: false },
  { name: 'Vapaaehtoistyö',            checked: false },
  { name: 'Terveydenhuoltoala',        checked: false }
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

export default function OnBoardingField({ route, navigation }) {
  const [fields, dispatch] = useReducer(reducer, initialFields)

  const onContinuePress = () => {
    let data = route.params
    let flds = fields.slice()
    let checkedFields = []

    flds.forEach(item => {
      if (item.checked) checkedFields.push(item.name)
    });

    data.fields = checkedFields
    console.log("Tähänastiset tiedot: ", data)
    navigation.navigate('OnBoardingSkills', data);
  }

  const handleChecked = (item) => {
    dispatch({ type: "CHECKED", name: item.name });
  }

  return (
    <GradientBackground>
      <ChatAvatar />
      <ChatBubble text={ 'Mikä ala on eritysosaamistasi?' } />
      <CheckList data={ fields } tapFunc={ handleChecked } />
      <ButtonContainer
        buttonFunc={ () => { onContinuePress() } }
      />
    </GradientBackground>
  );
}
