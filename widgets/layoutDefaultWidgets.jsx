import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles, { Colors } from '../styles';

const styles = StyleSheet.create({
  column: {
    marginLeft: 8,
    marginBottom: 20,
    marginTop: 10,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.accentMain,
    padding: 10,
  },
})

// Text element for titles
export const TitleRow = ({ size, title }) => (
  <Text style={{ fontSize: size }}>
    {title}
  </Text>
)

// Text displayed when no content is available
export const PlaceholderText = ({ text }) => (
  <View style={{ alignItems: 'center', paddingTop: 5, width: '100%' }}>
    <Text style={{ color: Colors.grey, fontStyle: 'italic', fontSize: 16 }}>
      { text }
    </Text>
  </View>
)

const onNavigationButtonPress = (target, navigator, values) => {
  if (target) {
    try {
      navigator.navigate(target, values)
    } catch (error) {
      console.log(error);
    }
  }
}

// Button with navigation press function
export const NavigationButton = ({ title, target, values, containerStyles=null, buttonStyles=null }) => {
  const navigator = useNavigation();
  return (
    <ButtonComponent
      title={ title }
      buttonFunction={ () => onNavigationButtonPress(target, navigator, values) }
      containerStyles={ containerStyles }
      buttonStyles={ buttonStyles }
    />
  )
}

// Button with press function
export const ButtonComponent = ({ title, buttonFunction, containerStyles=null, buttonStyles=null }) => (
  <View style={[ styles.buttonContainer, containerStyles ]}>
    <TouchableOpacity 
      style={[ styles.button, Styles.border, Styles.alignCenter, buttonStyles ]} 
      onPress={ buttonFunction }
    >
      <Text>{ title }</Text>
    </TouchableOpacity>
  </View>
)
