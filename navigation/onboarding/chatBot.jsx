import React from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import OnboardingStyles from "./onboardingStyles";
import Styles, { Colors } from "../../styles";

// Avatar bubble for chatbot icon
export const ChatAvatar = ({ }) => (
  <View style={ OnboardingStyles.chatAvatar } >
    <Icon
      name={ 'terminal' }
      size={ 20 }
      color={ Colors.darkMain }
    />
  </View>
)

// Messages displayed by chatbot
export const ChatBubble = ({ text }) => (
  <View style={ OnboardingStyles.chatBubble } >
    <Text style={[ OnboardingStyles.text, { fontSize: 17 } ]}>
      { text }
    </Text>
  </View>
)

export const ButtonContainer = ({ buttonFunc, text=null }) => (
  <View style={[ OnboardingStyles.inputField, { height: 60 } ]}>
    <NavigationButton
      buttonFunc={ buttonFunc }
      text={ text }
    />
  </View>
)

export const NavigationButton = ({ 
  buttonFunc,
  text,
  brightColor=true,
  width='33%' 
}) => (
  <TouchableOpacity 
    style={[ 
      OnboardingStyles.inputButton,
      Styles.alignCenter, 
      {
        backgroundColor: brightColor ? Colors.accentGreenBright : Colors.accentGreenMedium,
        width: width
      } 
    ]} 
    onPress={ buttonFunc }
  >
    <Text style={ { color: Colors.lightMain, fontSize: 16 } }>
      { text || 'Jatketaan' }
    </Text>
  </TouchableOpacity>
)

export const InputField = ({ 
  placehonder,
  inputFunc,
  inputValue,
  buttonFunc,
  hasBackButton=false,
  backFunc=null 
}) => {
  return(
    <KeyboardAvoidingView style={[ OnboardingStyles.inputField, { height: hasBackButton ? 175 : 120 } ]}>
      <View style={ OnboardingStyles.inputText }>
        <TextInput
          style={ { color: Colors.greyDark, overflow: 'hidden' } }
          placeholder={ placehonder }
          onChangeText={ (text) => { inputFunc(text) } }
          underlineColorAndroid="transparent"
          value={ inputValue }
        />
      </View>
      <NavigationButton
        buttonFunc={ buttonFunc }
      />
      { hasBackButton ?
      <NavigationButton
        buttonFunc={ backFunc }
        text={ 'Minulla on jo tili' }
        brightColor={ false }
        width='50%'
      />
      : null }
    </KeyboardAvoidingView>
  )

}
