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

export const InputField = ({ placehonder, inputFunc, buttonFunc }) => {
  return(
    <KeyboardAvoidingView style={ OnboardingStyles.inputField }>
      <View style={ OnboardingStyles.inputText }>
        <TextInput
          style={ { color: Colors.greyDark, overflow: 'hidden' } }
          placeholder={ placehonder }
          onChangeText={ inputFunc }
          underlineColorAndroid="transparent"
        />
      </View>
      <TouchableOpacity 
        style={[ OnboardingStyles.inputButton, Styles.alignCenter ]} 
        onPress={ buttonFunc }
      >
        <Text style={ { color: Colors.lightMain, fontSize: 16 } }>Jatketaan</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )

}
